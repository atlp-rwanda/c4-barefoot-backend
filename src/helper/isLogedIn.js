import { verifyToken } from '../utils/auth';
import UserServices from '../services/user.service';



const isLogedIn =async (req, res, next) => {
  if (!req.headers.authorization) throw new AuthorizationError(res.__('no auth header found'), 401);
    const authHeader = req.headers.authorization.split(' ');
    const [authString, token] = authHeader;
    if (authString !== 'Bearer') throw new AuthorizationError(res.__('no auth header found'), 401);
    if (!token) throw new AuthorizationError(res.__('No token found'), 401);
  const decodedToken = await verifyToken(token);
  if (!decodedToken) throw new AuthorizationError(res.__('token can not be decoded'), 401);
  const user = await UserServices.getUserByUserNameAndToken(decodedToken.username, token);

  if (!user) return res.status(401).json({ status: 401, message: res.__('You are not loged in') });
  return next();
};

export default isLogedIn;
