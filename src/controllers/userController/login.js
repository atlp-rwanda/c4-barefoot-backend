import 'express-async-errors';
import isUserExist from '../../services/findUser';
import ApplicationError from '../../utils/Errors/applicationError';
import BadRequestError from '../../utils/Errors/badRequestError';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
import { comparePassword, generateToken } from '../../utils/auth';

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = await isUserExist(email);
  if (isUser === null) {
    throw new NotFoundRequestError(`You don't have an account with this email: ${email}`, 404);
  }

  if (isUser.verified === false) {
    throw new ApplicationError('Please verify your email first', 403);
  }
  const result = comparePassword(password, isUser.password);
  if (!result) throw new BadRequestError('Password incorrect', 400);

  try {
    const userData = {
      username: isUser.username,
      user_role_id: isUser.user_role_id
    };
    const userToken = await generateToken(userData);
    // updating user refresh token in database
    await isUser.update({ refreshtoken: userToken });
    res.cookie('make', userToken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
    return res.status(200).json({ status: 200, message: 'login successful', data: userToken });
  } catch (err) {
    next(err);
  }
};

export default login;
