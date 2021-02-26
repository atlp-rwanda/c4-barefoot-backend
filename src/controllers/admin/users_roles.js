import usersService from '../../services/users';
import applicationError from '../../utils/Errors/applicationError';
import userBadRequest from '../../utils/Errors/badRequestError';
import notFound from '../../utils/Errors/notFoundRequestError';
import roleServices from '../../services/roles';
import accessDenied from '../../utils/Errors/accessDenied';
import readData from '../../utils/readData';
import models from '../../models'

export const findUsers = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const skip = ((page - 1) === -1) ? 0 : (page - 1) * limit;

    // find users using services
    const users = await usersService.findUsers({
      offset: skip,
      limit,
      attributes: ['id', 'first_name', 'last_name', 'username', 'bio', 'email', 'address', 'language', 'profile_picture', 'user_role_id', 'manager_id', 'verified']

    });

    if (users) {
      if (!users.rows.length) { throw new notFound(`No user found on page ${page}`); }

      return res.status(200).json({ status: 200, users });
    }

    throw new applicationError(('Failed to fetch users, try again!'), 500);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const roles = readData.getPermissionsObject();

    /* check if role exist */
    if (!roles.hasOwnProperty(role)) { throw new notFound(('Role not exist!')); }
    if (role === 'administrator') { throw new accessDenied(('Access denied!')); }

    /* check if the user exist */
    const findUser = await usersService.getUser({ email });
    if (findUser && (findUser.verified === true)) {
      const findRole = await roleServices.findRole({ name: role });
      if (findRole) {
        /* update the user role */
        const upDate = await usersService.updateUserRole({ email, user_role_id: findRole.id });
        if (upDate) {
          res.status(201).json({ status: 201, message: (`The user role is updated to ${role}`) });
        } else {
          throw new applicationError(('Failed to update this role, try again!'), 500);
        }
      } else {
        throw new notFound((`${role} does not exist`));
      }
    } else {
      throw new notFound((`${email} does not exist or not verified!`));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const findUser = await usersService.getUser({ email: userEmail });
    if (findUser) {
      const deleted = await usersService.deleteUser(userEmail);
      if (deleted) {
        res.status(200).json({ status: 200, message: ('The user is deleted successfully!') });
      } else {
        throw new applicationError(('Failed to delete this user! Try again'), 500);
      }
    } else {
      throw new notFound((`${userEmail} does not exist!`));
    }
  } catch (error) {
    next(error);
  }
};

export const assignLineManager = async (req, res, next) => {
  try {
    const { email, manager_id } = req.body;
    const findUser = await usersService.getUser({ email });
    if (findUser) {
      const findRoleById = await roleServices.findRoleById({ id: findUser.user_role_id });
      if (findRoleById) {
        if (findRoleById.name !== 'requester' && findRoleById.name !== 'manager') {
          throw new accessDenied((`Cannot assign line manager to this user! ${findRoleById.name}`), 403);
        }
      }
      const findManagerById = await usersService.findManagerById(manager_id);
      if (findManagerById) {
        const findRoleById = await roleServices.findRoleById({ id: findManagerById.user_role_id });
        if (findRoleById && (findRoleById.name === 'manager')) {
          const updateUser = await usersService.updateUser({ email, manager_id });
          if (updateUser) {
            res.status(201).json({ status: 201, message: ('Line manager is assigned successfully') });
          } else {
            throw new applicationError(('Failed to assign this line manager, try again!'));
          }
        } else {
          throw new notFound(('Line manager does not exist!'));
        }
      } else {
        throw new notFound(('The line manager does not exist'), 404);
      }
    } else {
      throw new notFound(('No user found!'), 404);
    }
  } catch (err) {
    next(err);
  }
};

/* ------------------------------------------ROLES CONTROLLERS---------------------------*/

export const createRole = async (req, res, next) => {
  try {
    /** receives the body object from the request */
    const requestData = req.body;

    /* a constructor holding all permissions */

    function Perm() {
      this[('edit profile')] = 1,

      this[('assign requesters to manager')] = 0,
      this[('create travel requests')] = 0,
      this[('view travel requests')] = 0,
      this[('edit travel requests')] = 0,
      this[('cancel travel requests')] = 0,

      this[('approve direct reports travel requests')] = 0,
      this[('view direct reports travel requests')] = 0,
      this[('reject direct reports travel requests')] = 0,

      this[('view accommodations')] = 1,
      this[('create accommodations')] = 0,
      this[('update accommodations')] = 0,
      this[('delete accommodations')] = 0,
      this[('book accommodations')] = 0,

      this[('view locations')] = 1,
      this[('create locations')] = 0,
      this[('update locations')] = 0,
      this[('delete locations')] = 0;
    }

    // import existing data in index.json
    const roles = readData.getPermissionsObject();

    let existProp = false;
    /* check if index.json has this requested role */
    const role = `${requestData.role}`;
    if (roles.hasOwnProperty(role)) {
      existProp = true;
      throw new userBadRequest(('Role exist!'));
    }
    /* if request role doesn't exist, then create one */
    if (!existProp) {
      /* a role object to add in db */
      const Roles = {
        name: requestData.role,
        description: requestData.description
      };

      const saveRole = await roleServices.createOne(Roles);
      if (saveRole) {
        roles[role] = new Perm();

        /* convert this new JSON data from one line to readable using stringify */
        const dataJson = JSON.stringify(roles, null, 2);
        roleServices.saveInFile(dataJson);

        res.status(201).json({ status: 201, message: ('Role created successfully') });
      } else {
        throw new applicationError(('Failed to create this role, try again!'), 500);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const getAllRoles = async (req, res, next) => {
  try {
    // find roles using services
    const allRoles = await roleServices.findRoles({});

    if (allRoles) {
      if (!allRoles.rows.length) { throw new notFound(('No role found')); }
      return res.status(200).json({ status: 200, roles: allRoles });
    }

    throw new applicationError(('Failed to fetch roles, try again!'), 500);
  } catch (error) {
    next(error);
  }
};
export const updateRoles = async (req, res, next) => {
  const id =req.params.id
  const requestData={name:'',description:''}
  requestData.name = req.body.role;
  requestData.description = req.body.description;
  const roles = readData.getPermissionsObject();
  const role= await models.Role.findOne({where:{id:id}});
  let perm=null;
  if (roles.hasOwnProperty(role.name)) {
    if(role.name != requestData.name){
      perm=roles[role.name];
      console.log(perm)
    }
  }
  if(perm){
    if(delete roles[role.name]){
      roles[requestData.name]=perm;
    };
  }
  // return res.send({permissions: roles[requestData.name]});
  try {
    const update = await models.Role.update(requestData,{where:{id:id}});  
    const dataJson = JSON.stringify(roles, null, 2);
    roleServices.saveInFile(dataJson);
    return res.send({message:"update successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

export const findPermissonsByRole = async (req, res, next) => {
  const roles = readData.getPermissionsObject();
  const id =req.params.id
  const role= await models.Role.findOne({where:{id:id}});
  if (roles.hasOwnProperty(role.name)) {
   return res.send({permissions: roles[role.name]});
  }
  return res.status(404).send({message:"role Not found"});
};

export const updatePermissions = (req, res, next) => {
  try {
    const requestData = req.body;

    const roles = readData.getPermissionsObject();

    let existProp = true;
    /* check if index.json does not have this requested role */
    const role = `${requestData.role}`;
    if (!roles.hasOwnProperty(role)) {
      existProp = false;
      throw new notFound(('Role not exist!'));
    }

    if (existProp) {
      /* check if requested permissions are valid and values are valid */
      const { permissions } = requestData;
      const validPermission = [];
      for (const property in permissions) {
        if (roles[role].hasOwnProperty(property)) {
          if ((permissions[property] === 0) || (permissions[property] === 1)) {
            /* a property from index.json is assigned a value from the request */
            roles[role][property] = permissions[property];
          } else {
            /* catch invalid property values (non 0 or 1 values) */
            validPermission.push(property);
          }
        } else {
          /* catch invalid properties */
          validPermission.push(property);
        }
      }
      const dataJson = JSON.stringify(roles, null, 2);

      /* save changes */
      roleServices.saveInFile(dataJson);

      if (validPermission != '') {
        throw new userBadRequest({ message: ('These permissions or values are not allowed'), 'failed permissions': validPermission, success: roles[role] });
      } else {
        res.status(201).json({
          status: 201, message: ('Permissions updated successfully'), 'failed permissions': validPermission, success: roles[role]
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const deleteRoles = async (req, res, next) => {
  try {
    const requestRole = req.body.role;

    const roles = readData.getPermissionsObject();

    let existProp = true;
    /* check if index.json does not have this requested role */
    if (!roles.hasOwnProperty(requestRole)) {
      existProp = false;
      throw new notFound(('Role not exist!'));
    }

    if (requestRole === 'administrator') { throw new accessDenied(('Can not delete the administrator role!')); }
    if (existProp) {
      if (delete roles[requestRole]) {
        const dataJson = JSON.stringify(roles, null, 2);
        const findRole = await roleServices.findRole({ name: requestRole });
        if (findRole) {
          const changeRole = await roleServices.changeRole({ change: null, role_id: findRole.id });
          let deletedRole;
          if (changeRole) {
            deletedRole = await roleServices.deleteOne(findRole.id);
          }

          if (deletedRole) {
            /* save changes */
            roleServices.saveInFile(dataJson);
            return res.status(200).json({ status: 200, message: ('Role deleted successfully'), role: requestRole });
          }
          throw new applicationError(('Failed to delete this role, try again!'), 500);
        } else {
          throw new notFound(('Role not found!'), 404);
        }
      } else {
        throw new applicationError(('Failed to delete this role, try again!'), 500);
      }
    }
  } catch (err) {
    next(err);
  }
};
