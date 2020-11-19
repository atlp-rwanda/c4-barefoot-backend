import { verifyToken } from '../utils/auth';
import findRoles from '../services/findRoles';
import ForbidenRequestError from '../utils/forbidenError';
import UnauthorizedError from '../utils/unauthorized';

const isManager = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw new UnauthorizedError('Unauthorized', 401);
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  console.log(decoded);
  const roles = await findRoles(decoded.role);
  console.log(roles);
  if (roles.name !== 'manager') throw new ForbidenRequestError('Access denied', 409);
  if (roles.name === 'manager') return next();
};
// user.user_role_id

export default isManager;
