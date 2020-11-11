import 'dotenv/config';
import UserServices from '../services/user.service';
import { verifyToken } from '../utils/auth';
import AuthorizationError from '../utils/authorizationError';
import BadRequestError from '../utils/badRequestError';
import ApplicationError from '../utils/applicationError';

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
    const record = await UserServices.getUserByEmail(decodedToken.user);
    if (!record) throw new BadRequestError('data in token is invalid', 400);
    res.locals.token = await decodedToken.user;
    if (!res.locals.token) throw new ApplicationError('server cant assign token', 500);
    next();
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export default verifyUserToken;
