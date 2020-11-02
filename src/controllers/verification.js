// verification controller
import jwt from 'jsonwebtoken';
import models from '../models';
import 'dotenv/config';
import signUpError from '../utils/ApplicationError';
import isUserExist from '../services/findUser';

const verification = async (req, res, next) => {
  const updateUser = async (user) => {
    try {
      const record = await isUserExist(user);
      if (!record) {
        throw new signUpError('Account does not exist', 404);
      }

      if (record.verified === false) {
        models.user.update({ verified: true }, { where: { email: user } });
        return res.status(200).json({ Status: 200, Message: 'Email has been verified' });
      }
      throw new signUpError('Account already verified', 400);
    } catch (error) {
      next(error);
    }
  };

  jwt.verify(req.params.token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new signUpError('Invalid token', 400);
    updateUser(user.user);
  });
};

export default verification;
