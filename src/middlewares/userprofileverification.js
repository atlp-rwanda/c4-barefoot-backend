import jwt from 'jsonwebtoken';
import 'dotenv/config';
<<<<<<< HEAD
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
=======

// verify user token and if user profile matched signed user
const verifyUserToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ message: 'No token found' });
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (res) => {
      res.status(200).json({ message: 'user token is valid' });
      return token;
    });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid user token' });
  }
};

const verifyUser = async (req, res, next) => {
  verifyUserToken().then((token) => {
    try {
      const decodedToken = jwt.decode(token);
      if (decodedToken.userId !== req.params.userId) return res.status(401).json({ message: 'owner of profile does not match signed in user' });
      res.status(200).json({ message: 'owner of profile match signed in user' });
      return next();
    } catch (err) {
      return res.status(500).json({ message: 'failed to decode a user token' });
    }
  }).catch(() => res.status(401).json({ message: 'No token found' }));
};

// eslint-disable-next-line import/prefer-default-export
export { verifyUserToken, verifyUser };
>>>>>>> added verifying user before get and update user profile
