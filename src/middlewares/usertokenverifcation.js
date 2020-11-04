import jwt from 'jsonwebtoken';
import 'dotenv/config';
import VerifyTokenError from '../utils/verifytokenerror';
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
    const record = await UserServices.getUserById(decodedToken.data);
    if (!record) throw new VerifyTokenError('data in token is invalid', 401);
    res.locals = token;
    if (res.locals !== token) throw new VerifyTokenError('server cant assign token', 500);
    next();
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export default verifyUserToken;
