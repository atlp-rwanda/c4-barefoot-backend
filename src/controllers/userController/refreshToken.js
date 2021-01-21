import UserServices from '../../services/user.service';
import BadRequestError from '../../utils/Errors/badRequestError';
import { verifyToken, generateToken } from '../../utils/auth';

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.make;
   
      if (!token) {
        throw new BadRequestError(res.__('Please login!'), 400);
      }
    const payload = await verifyToken(token);
    // check if user exist in databasa
    const newUser = await UserServices.getUserByUserNameAndToken(payload.username,token);
    const userData = {
      username: newUser.username,
      user_role_id: newUser.user_role_id
    };
    if (!newUser) {
      throw new BadRequestError(res.__('no user found with this token'), 400);
    }
    const userToken = generateToken(userData);
    
    await newUser.update({ refreshtoken: userToken });
    res.clearCookie('make', { path: '/api/v1/user/refresh-token' });
   
    // user.reftoken = reftoken;
    res.cookie('make', userToken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
    return res.status(200).json({ userToken });
  } catch (error) {
    next(error);
  }
};

export default refreshToken;
