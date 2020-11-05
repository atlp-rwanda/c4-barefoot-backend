import jwt from 'jsonwebtoken';
import 'dotenv/config';
import VerifyTokenError from '../utils/verifytokenerror';
import UsersError from '../utils/userserror';
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
    const record = await UserServices.getUserByEmail(decodedToken.data);
    if (!record) throw new UsersError('data in token is invalid', 400);
    res.locals.token = await decodedToken.data;
    if (!res.locals.token) throw new VerifyTokenError('server cant assign token', 500);
    next();
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export default verifyUserToken;
