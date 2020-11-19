import UserServices from '../services/user.service';
import { verifyToken } from '../utils/auth';

const getDataFromToken = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    // added these two lines to get a same auth header(Bearer Auth)
    const authHeader = req.headers.authorization.split(' ');
    const [authString, token] = authHeader;
    const authorization = token;
    console.log("Auth: " + authorization)
    try {
      const user = await verifyToken(authorization);
      const userInfo = UserServices.getUserByUserName(user.username);
      return userInfo;
    } catch (e) {
      return res.status(401).json({ message: 'session has expired, please login' });
    }
  } else {
    return res.status(404).json({ status: 404, message: 'No token found!' });
  }
};

export default getDataFromToken;
