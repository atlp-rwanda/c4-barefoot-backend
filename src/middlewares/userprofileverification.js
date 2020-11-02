import jwt from 'jsonwebtoken';
import 'dotenv/config';

// verify user token
const verifyUserToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ message: 'no auth header found' });
    const authHeader = req.headers.authorization.split(' ');
    const [authString, token] = authHeader;
    if (authString !== 'Bearer') return res.status(401).json({ message: 'no auth header found' });
    if (!token) return res.status(401).json({ message: 'No token found' });
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verify) return res.status(401).json({ message: 'token cant be verified' });
    res.locals = token;
    if (res.locals !== token) return res.status(500).json({ message: 'server cant assign token' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid user token' });
  }
};
// eslint-disable-next-line import/prefer-default-export
export default verifyUserToken;
