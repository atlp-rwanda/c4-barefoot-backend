import UserServices from '../services/user.service';
import { verifyToken } from '../utils/auth';

const getDataFromToken = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    // added these two lines to get a same auth header(Bearer Auth)
    const authHeader = req.headers.authorization.split(' ');
    const [authString, token] = authHeader;
    const authorization = token;
    try {
      const user = await verifyToken(authorization);
      const userInfo = UserServices.getUserByUserName(user.username);
      return userInfo;
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: 'session has expired, please login' });
    }
  }
};

export default getDataFromToken;
