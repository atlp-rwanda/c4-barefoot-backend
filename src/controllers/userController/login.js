import 'express-async-errors';
import isUserExist from '../../services/findUser';
import ApplicationError from '../../utils/Errors/applicationError';
import BadRequestError from '../../utils/Errors/badRequestError';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
import { comparePassword, generateToken } from '../../utils/auth';
import findRole from '../../services/findRoleById';

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = await isUserExist(email);
  if (isUser === null) {
    throw new NotFoundRequestError((`You don't have an account with this email: ${email}`), 404);
  }

  if (isUser.verified === false) {
    throw new ApplicationError(('Please verify your email first'), 403);
  }
  const result = comparePassword(password, isUser.password);
  if (!result) throw new BadRequestError(('Password incorrect'), 400);

  try {
    const userProfile = {
      id: isUser.id,
      first_name: isUser.first_name,
      last_name: isUser.last_name,
      email: isUser.email,
      username: isUser.username,
      verified: isUser.verified,
      user_role_id: isUser.user_role_id,
      manager_id: isUser.manager_id,
      profile_picture: isUser.profile_picture,
      language: isUser.language,
      address: isUser.address,
      createdAt: isUser.createdAt,
      updatedAt: isUser.updatedAt
    };
    const userData = {
      role: isUser.user_role_id,
      username: isUser.username
    };
    const userToken = await generateToken(userData);
    const role= await findRole(userData.role);
    // updating user refresh token in database
    await isUser.update({ refreshtoken: userToken });
    res.cookie('make', userToken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
    return res.status(200).json({
      status: 200, message: ('login successful'), data: userToken, profile: userProfile, role: role.name
    });
  } catch (err) {
    next(err);
  }
};

export default login;
