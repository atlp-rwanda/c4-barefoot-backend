import 'dotenv/config';
import UserServices from '../services/user.service';
import { verifyToken } from '../utils/auth';
import AuthorizationError from '../utils/Errors/authorizationError';
import BadRequestError from '../utils/Errors/badRequestError';
import ApplicationError from '../utils/Errors/applicationError';

// verify user token
const verifyUserToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new AuthorizationError('no auth header found', 401);
    const authHeader = req.headers.authorization.split(' ');
    const [authString, token] = authHeader;
    if (authString !== 'Bearer') throw new AuthorizationError('no auth header found', 401);
    if (!token) throw new AuthorizationError('No token found', 401);
    const decodedToken = await verifyToken(token);
    if (!decodedToken) throw new AuthorizationError('token can not be decoded', 401);
    const record = await UserServices.getUserByUserName(decodedToken.username);
    if (!record) throw new BadRequestError('data in token is invalid', 400);
    res.locals.token = await decodedToken.username;
    if (!res.locals.token) throw new ApplicationError("server can't assign token", 500);
    next();
  } catch (err) {
    next(err);
  }
};
export default verifyUserToken;
