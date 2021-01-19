import usersService from '../services/users';
import notFound from '../utils/Errors/notFoundRequestError';
import accessDenied from '../utils/Errors/accessDenied';
import roleServices from '../services/roles';

export const changeUserRole = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const findUser = await usersService.getUser({ email: userEmail });
    if (findUser) {
      // user with a role
      if (findUser.user_role_id !== null) {
        const findRoleById = await roleServices.findRoleById({ id: findUser.user_role_id });
        if (findRoleById.name === 'administrator') { throw new accessDenied(res.__('Can not delete the administrator!')); }
        const changeRole = await usersService.changeRole({ change: null, manager_id: findUser.id });
      }
      // user with relationships
      const findRelations = await usersService.findRelations({ id: findUser.id });
      if (findRelations) {
        const changeRole = await usersService.changeRole({ change: null, manager_id: findUser.id });
      }
      next();
    } else {
      throw new notFound(res.__(`${userEmail} does not exist!`));
    }
  } catch (err) {
    next(err);
  }
};
