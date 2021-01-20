import UserServices from '../../services/user.service';
import BadRequestError from '../../utils/Errors/badRequestError';
import { verifyToken, generateToken } from '../../utils/auth';
// const logout = (req, res) => {
//   try {
//     res.clearCookie('make', { path: '/api/v1/user/refresh-token' });

//     res.status(200).json({ status: 200, message: res.__('Logout successful!') });
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };

const logout = async (req, res) => {
  const token = req.header('authorization').replace('Bearer ', '');
  try {

    console.log(token);
    if (!token) {
      throw new BadRequestError(res.__('Please login!'), 400);
    }
    const payload = await verifyToken(token);
    // check if user exist in databasa
    const newUser = await UserServices.getUserByUserName(payload.username);

    if (!newUser) {
      throw new BadRequestError(res.__('no user found with this token'), 400);
    }
    const userToken = "";

    await newUser.update({ refreshtoken: userToken });
    res.clearCookie('make', { path: '/api/v1/user/refresh-token' });

    res.status(200).json({ status: 200, message: res.__('Logout successful!') });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export default logout;
