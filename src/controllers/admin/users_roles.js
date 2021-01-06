import usersService from '../../services/users';
import applicationError from '../../utils/Errors/applicationError';
import userBadRequest from '../../utils/Errors/badRequestError';
import notFound from '../../utils/Errors/notFoundRequestError';
import roleServices from '../../services/roles';
import accessDenied from '../../utils/Errors/accessDenied';
import readData from '../../utils/readData';

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
      if (!users.rows.length) { throw new notFound(res.__(`No user found on page ${page}`)); }

      return res.status(200).json({ status: 200, users });
    }

    throw new applicationError(res.__('Failed to fetch users, try again!'), 500);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const roles = readData.getPermissionsObject();

    /* check if role exist */
    if (!roles.hasOwnProperty(role)) { throw new notFound(res.__('Role not exist!')); }
    if (role === res.__('administrator')) { throw new accessDenied(res.__('Access denied!')); }

    /* check if the user exist */
    const findUser = await usersService.getUser({ email });
    if (findUser && (findUser.verified === true)) {
      const findRole = await roleServices.findRole({ name: role });
      if (findRole) {
        /* update the user role */
        const upDate = await usersService.updateUserRole({ email, user_role_id: findRole.id });
        if (upDate) {
          return res.status(201).json({ status: 201, message: res.__(`The user role is updated to ${role}`) });
        } else {
          throw new applicationError(res.__('Failed to update this role, try again!'), 500);
        }
      } else {
        throw new notFound(res.__(`${role} does not exist`));
      }
    } else {
      throw new notFound(res.__(`${email} does not exist or not verified!`));
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
        res.status(200).json({ status: 200, message: res.__('The user is deleted successfully!') });
      } else {
        throw new applicationError(res.__('Failed to delete this user! Try again'), 500);
      }
    } else {
      throw new notFound(res.__(`${userEmail} does not exist!`));
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
          throw new accessDenied(res.__(`Cannot assign line manager to this user! ${findRoleById.name}`), 403);
        }
      }
      const findManagerById = await usersService.findManagerById(manager_id);
      if (findManagerById) {
        const findRoleById = await roleServices.findRoleById({ id: findManagerById.user_role_id });
        if (findRoleById && (findRoleById.name === 'manager')) {
          const updateUser = await usersService.updateUser({ email, manager_id });
          if (updateUser) {
            res.status(201).json({ status: 201, message: res.__('Line manager is assigned successfully') });
          } else {
            throw new applicationError(res.__('Failed to assign this line manager, try again!'));
          }
        } else {
          throw new notFound(res.__('Line manager does not exist!'));
        }
      } else {
        throw new notFound(res.__('The line manager does not exist'), 404);
      }
    } else {
      throw new notFound(res.__('No user found!'), 404);
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
      this[res.__('edit profile')] = 1,

      this[res.__('assign requesters to manager')] = 0,
      this[res.__('create travel requests')] = 0,
      this[res.__('view travel requests')] = 0,
      this[res.__('edit travel requests')] = 0,
      this[res.__('cancel travel requests')] = 0,

      this[res.__('approve direct reports travel requests')] = 0,
      this[res.__('view direct reports travel requests')] = 0,
      this[res.__('reject direct reports travel requests')] = 0,

      this[res.__('view accommodations')] = 1,
      this[res.__('create accommodations')] = 0,
      this[res.__('update accommodations')] = 0,
      this[res.__('delete accommodations')] = 0,
      this[res.__('book accommodations')] = 0,

      this[res.__('view locations')] = 1,
      this[res.__('create locations')] = 0,
      this[res.__('update locations')] = 0,
      this[res.__('delete locations')] = 0;
    }

    // import existing data in index.json
    const roles = readData.getPermissionsObject();

    let existProp = false;
    /* check if index.json has this requested role */
    const role = `${requestData.role}`;
    if (roles.hasOwnProperty(role)) {
      existProp = true;
      throw new userBadRequest(res.__('Role exist!'));
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

        res.status(201).json({ status: 201, message: res.__('Role created successfully') });
      } else {
        throw new applicationError(res.__('Failed to create this role, try again!'), 500);
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
      if (!allRoles.rows.length) { throw new notFound(res.__('No role found')); }
      return res.status(200).json({ status: 200, roles: allRoles });
    }

    throw new applicationError(res.__('Failed to fetch roles, try again!'), 500);
  } catch (error) {
    next(error);
  }
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
      throw new notFound(res.__('Role not exist!'));
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
        throw new userBadRequest({ message: res.__('These permissions or values are not allowed'), 'failed permissions': validPermission, success: roles[role] });
      } else {
        res.status(201).json({
          status: 201, message: res.__('Permissions updated successfully'), 'failed permissions': validPermission, success: roles[role]
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
      throw new notFound('Role not exist!');
    }

    if (requestRole === 'administrator') { throw new accessDenied(res.__('Can not delete the administrator role!')); }
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
            return res.status(200).json({ status: 200, message: res.__('Role deleted successfully'), role: requestRole });
          }
          throw new applicationError(res.__('Failed to delete this role, try again!'), 500);
        } else {
          throw new notFound(res.__('Role not found!'), 404);
        }
      } else {
        throw new applicationError(res.__('Failed to delete this role, try again!'), 500);
      }
    }
  } catch (err) {
    next(err);
  }
};
