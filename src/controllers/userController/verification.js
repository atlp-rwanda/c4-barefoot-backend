import jwt from 'jsonwebtoken';
import 'dotenv/config';
import badRequest from '../../utils/Errors/badRequestError';
import notFoundError from '../../utils/Errors/notFoundRequestError';
import UserServices from '../../services/user.service';

const verification = async (req, res, next) => {
  const updateUser = async (user) => {
    try {
      const record = await UserServices.getUserByUserName(user);
      if (!record) {
        throw new notFoundError(('Account does not exist'));
      }
      if (record.verified === false) {
        const data = { verified: true };
        UserServices.updateUserByUsername(data, user);
        return res.status(200).json({ status: 200, message: ('Email has been verified') });
      } throw new badRequest(('Account already verified'));
    } catch (error) {
      next(error);
    }
  };

  jwt.verify(req.query.token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new badRequest(('Invalid token'));
    updateUser(user.username);
  });
};

export default verification;
