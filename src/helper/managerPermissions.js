import { verifyToken } from '../utils/auth';
import findRoles from '../services/findRoles';
import ForbidenRequestError from '../utils/forbidenError';
import UnauthorizedError from '../utils/unauthorized';
import UnProcessedError from '../utils/unProcessedError';

const managerPermissions = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw new UnauthorizedError('Unauthorized', 401);
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  const roles = await findRoles(decoded.role);
  if (roles.name !== 'manager') throw new ForbidenRequestError('Access denied', 409);
  if (roles.name === 'manager') {
    // if (permissions.manager['assign requesters to manager'] !== 1) throw new UnProcessedError('You don\'t have this permission', 403);
    // if (permissions.manager['assign requesters to manager'] === 1) 
    return next();
  }
};

export default managerPermissions;
