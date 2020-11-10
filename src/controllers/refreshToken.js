import findUser from '../services/findUser';
import BadRequestError from '../utils/badRequestError';
import { verifyToken, generateToken } from '../utils/auth';

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.make;
    try {
      if (!token) {
        throw new BadRequestError('Please login!', 400);
      }
    } catch (e) {
      next(e);
    }
    const payload = await verifyToken(token);
    // check if user exist in databasa
    const newUser = await findUser(payload.email);
    const userData = {
      id: newUser.id,
      email: newUser.email
    };
    if (!newUser) {
      throw new BadRequestError('no user found with this token', 400);
    }
    const userToken = generateToken(userData);

    // user.reftoken = reftoken;
    res.cookie('make', userToken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
    return res.status(200).json({ userToken });
  } catch (error) {
    console.log(error.message);
  }
};

export default refreshToken;
