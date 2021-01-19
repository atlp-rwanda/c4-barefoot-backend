import { verifyToken } from '../utils/auth';
import findRoles from '../services/findRoles';
import UnauthorizedError from '../utils/Errors/authorizationError';

const managerPermissions = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw new UnauthorizedError(res.__('Unauthorized'));
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  const roles = await findRoles(decoded.role);
  if (roles.name !== 'manager') throw new UnauthorizedError(res.__('Access denied'));
  if (roles.name === 'manager') {
    return next();
  }
};

export default managerPermissions;
