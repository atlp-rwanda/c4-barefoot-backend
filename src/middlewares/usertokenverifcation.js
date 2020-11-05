import jwt from 'jsonwebtoken';
import 'dotenv/config';
import VerifyTokenError from '../utils/verifytokenerror';
<<<<<<< HEAD
<<<<<<< HEAD
import UsersError from '../utils/userserror';
=======
>>>>>>> refactoring controllers and middlewares
=======
import UsersError from '../utils/userserror';
>>>>>>> add testing for verifyuser token middleware
import UserServices from '../services/user.service';
// verify user token
const verifyUserToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new VerifyTokenError('no auth header found', 401);
    const authHeader = req.headers.authorization.split(' ');
    const [authString, token] = authHeader;
    if (authString !== 'Bearer') throw new VerifyTokenError('no auth header found', 401);
    if (!token) throw new VerifyTokenError('No token found', 401);
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verify) throw new VerifyTokenError('token cant be verified', 401);
    const decodedToken = jwt.decode(token);
<<<<<<< HEAD
    const record = await UserServices.getUserByEmail(decodedToken.data);
    if (!record) throw new UsersError('data in token is invalid', 400);
    res.locals.token = await decodedToken.data;
    if (!res.locals.token) throw new VerifyTokenError('server cant assign token', 500);
=======
    const record = await UserServices.getUserById(decodedToken.data);
<<<<<<< HEAD
    if (!record) throw new VerifyTokenError('data in token is invalid', 401);
    res.locals = token;
    if (res.locals !== token) throw new VerifyTokenError('server cant assign token', 500);
>>>>>>> refactoring controllers and middlewares
=======
    if (!record) throw new UsersError('data in token is invalid', 400);
    res.locals.token = await decodedToken.data;
    if (!res.locals.token) throw new VerifyTokenError('server cant assign token', 500);
>>>>>>> add testing for verifyuser token middleware
    next();
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export default verifyUserToken;
