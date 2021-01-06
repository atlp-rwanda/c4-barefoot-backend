import UserServices from '../services/user.service';
import { verifyToken } from '../utils/auth';

const getDataFromCookies = async (req, res, next) => {
  if (req.cookies && req.cookies.authorization) {
    // added these two lines to get a same auth cookie(Bearer Auth)
    const authCookie = req.cookies.authorization.split(' ');
    const [authString, token] = authCookie;
    const authorization = token;
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

export default getDataFromCookies;
