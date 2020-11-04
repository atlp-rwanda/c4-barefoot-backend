import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserServices from '../services/user.service';
import UsersError from '../utils/userserror';

// get a user profile with either Id or first_name
const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) throw new UsersError('invalid URI', 404);
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new UsersError('user not found', 404);
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { next(err); }
};

// update a single user profile
const updateUserProfile = async (req, res, next) => {
  try {
    if (!res.locals) return res.status(500).json({ status: 500, message: 'can not receive locals' });
    const decodedToken = jwt.decode(res.locals);
    if (!decodedToken) throw new UsersError('no token found', 404);
    const userId = decodedToken.data;
    if (!userId) throw new UsersError('unable to obtain a payload in token', 404);
    const record = await UserServices.getUserById(userId);
    if (!record) throw new UsersError('user not found', 404);
    if (record.dataValues.id !== userId) throw new UsersError('owner of profile does not match signed in user', 401);
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      address: req.body.address,
      language: req.body.language,
      occupation: req.body.occupation,
      profile_picture: req.body.profile_picture
    };
    await UserServices.updateUser(data, userId);
    res.status(200).json({ status: 200, message: 'successfully updated user profile' });
  } catch (err) { next(err); }
};
export { getUserProfile, updateUserProfile };
