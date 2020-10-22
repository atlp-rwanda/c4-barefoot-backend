import jwt from 'jsonwebtoken';
import 'dotenv/config';

// verify user token
const verifyUserToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) return res.status(401).json({ message: 'No token found' });
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verify) return res.status(401).json({ message: 'token cant be verified' });
    res.locals = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid user token' });
  }
};
// eslint-disable-next-line import/prefer-default-export
export default verifyUserToken;
