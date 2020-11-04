<<<<<<< HEAD
import bcrypt from 'bcrypt';
import UserServices from '../services/user.service';
<<<<<<< HEAD
import UsersError from '../utils/userserror';
=======
import UpdateProfileError from '../utils/updateProfileError';
// get all users in database
const getAllUsers = async (req, res, next) => {
  try {
    const { page } = req.query;
    const options = {
      attributes: ['id', 'username', 'address'],
      page, // Default 1
      paginate: 2, // Default 25
      order: [['username', 'DESC']],
    };
    const record = await UserServices.getAllUsers(options);
    if (record.pages < page) throw new UpdateProfileError(`only ${record.pages} pages available`, 404);
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { next(err); }
};
>>>>>>> added error handling
=======
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserServices from '../services/user.service';
import UsersError from '../utils/userserror';
>>>>>>> added routes and refactored class of errors

// get a user profile with either Id or first_name
const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
<<<<<<< HEAD
<<<<<<< HEAD
    if (!username) throw new UsersError('invalid URI', 404);
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new UsersError('user not found', 400);
=======
    if (!username) throw new UpdateProfileError('invalid URI', 404);
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new UpdateProfileError('user not found', 404);
>>>>>>> added error handling
=======
    if (!username) throw new UsersError('invalid URI', 404);
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new UsersError('user not found', 404);
>>>>>>> added routes and refactored class of errors
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { next(err); }
};

// update a single user profile
const updateUserProfile = async (req, res, next) => {
  try {
<<<<<<< HEAD
    if (!res.locals.token) return res.status(500).json({ status: 500, message: 'unable to obtain a payload in token' });
    const email = res.locals.token;
    const record = await UserServices.getUserByEmail(email);
    if (!record) throw new UsersError('user not found', 404);
    if (record.dataValues.email !== email) throw new UsersError('owner of profile does not match signed in user', 401);
=======
    if (!res.locals) return res.status(500).json({ status: 500, message: 'can not receive locals' });
    const decodedToken = jwt.decode(res.locals);
    if (!decodedToken) throw new UsersError('no token found', 404);
    const userId = decodedToken.data;
    if (!userId) throw new UsersError('unable to obtain a payload in token', 404);
    const record = await UserServices.getUserById(userId);
<<<<<<< HEAD
    if (!record) throw new UpdateProfileError('user not found', 404);
    if (record.dataValues.id !== userId) throw new UpdateProfileError('owner of profile does not match signed in user', 401);
>>>>>>> added error handling
=======
    if (!record) throw new UsersError('user not found', 404);
    if (record.dataValues.id !== userId) throw new UsersError('owner of profile does not match signed in user', 401);
>>>>>>> added routes and refactored class of errors
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10);
<<<<<<< HEAD
    UserServices.updateUser(req.body, email);
=======
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      address: req.body.address,
      language: req.body.language,
      profile_picture: req.body.profile_picture
    };
    await UserServices.updateUser(data, userId);
>>>>>>> refactoring controllers and middlewares
    res.status(200).json({ status: 200, message: 'successfully updated user profile' });
  } catch (err) { next(err); }
};
export { getUserProfile, updateUserProfile };
