import { verifyToken } from '../utils/auth';
import findRoles from '../services/findRoles';
import UnauthorizedError from '../utils/Errors/authorizationError';

const isManager = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw new UnauthorizedError('Unauthorized');
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  const roles = await findRoles(decoded.role);
  if (roles.name !== 'manager') throw new UnauthorizedError('Access denied');
  if (roles.name === 'manager') return next();
};
// user.user_role_id

export default isManager;
