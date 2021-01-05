import UserServices from '../../services/user.service';
import BadRequestError from '../../utils/Errors/badRequestError';
import { verifyToken, generateToken } from '../../utils/auth';

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.make;
    try {
      if (!token) {
<<<<<<< HEAD
        throw new BadRequestError(res.__('Please login!'), 400);
=======
        throw new BadRequestError('Please login!', 400);
>>>>>>> main
      }
    } catch (e) {
      next(e);
    }
    const payload = await verifyToken(token);
    // check if user exist in databasa
    const newUser = await UserServices.getUserByUserName(payload.username);
    const userData = {
      username: newUser.username,
      user_role_id: newUser.user_role_id
    };
    if (!newUser) {
<<<<<<< HEAD
      throw new BadRequestError(res.__('no user found with this token'), 400);
=======
      throw new BadRequestError('no user found with this token', 400);
>>>>>>> main
    }
    const userToken = generateToken(userData);

    // user.reftoken = reftoken;
<<<<<<< HEAD
    res.cookie(res.__('make'), userToken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
=======
    res.cookie('make', userToken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
>>>>>>> main
    return res.status(200).json({ userToken });
  } catch (error) {
    next(error);
  }
};

export default refreshToken;
