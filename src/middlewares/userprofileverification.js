import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UpdateProfileError from '../utils/updateProfileError';
// verify user token
const verifyUserToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new UpdateProfileError('no auth header found', 401);
    const authHeader = req.headers.authorization.split(' ');
    const [authString, token] = authHeader;
    if (authString !== 'Bearer') throw new UpdateProfileError('no auth header found', 401);
    if (!token) throw new UpdateProfileError('No token found', 401);
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verify) throw new UpdateProfileError('token cant be verified', 401);
    res.locals = token;
    if (res.locals !== token) throw new UpdateProfileError('server cant assign token', 500);
    next();
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export default verifyUserToken;
