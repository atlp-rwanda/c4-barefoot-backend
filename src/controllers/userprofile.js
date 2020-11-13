import UserServices from '../services/user.service';
import NotFoundRequestError from '../utils/notFoundRequestError';
import ApplicationError from '../utils/applicationError';
import BadRequestError from '../utils/badRequestError';
import AuthorizationError from '../utils/authorizationError';

// get a user profile with either Id or first_name
const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) throw new BadRequestError('invalid URI', 400);
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new NotFoundRequestError('user not found', 404);
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { next(err); }
};

// update a single user profile
const updateUserProfile = async (req, res, next) => {
  try {
    if (!res.locals.token) throw new ApplicationError('unable to obtain a payload in token', 500);
    const email = res.locals.token;
    const record = await UserServices.getUserByEmail(email);
    if (!record) throw new NotFoundRequestError('user not found', 404);
    if (record.dataValues.email !== email) throw new AuthorizationError('owner of profile does not match signed in user', 401);
    UserServices.updateUser(req.body, email);
    res.status(200).json({ status: 200, message: 'successfully updated user profile' });
  } catch (err) { next(err); }
};
export { getUserProfile, updateUserProfile };
