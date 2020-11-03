import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserServices from '../services/user.service';

// get all users in database
const getAllUsers = async (req, res) => {
  try {
    const { page } = req.query;
    const options = {
      attributes: ['id', 'username', 'address'],
      page, // Default 1
      paginate: 2, // Default 25
      order: [['username', 'DESC']],
    };
    const record = await UserServices.getAllUsers(options);
    if (record.pages < page) return res.status(404).json({ status: 404, message: `only ${record.pages} pages available` });
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { res.status(404).json({ status: 404, message: 'no user found' }); }
};

// get a user profile with either Id or first_name
const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return res.status(404).json({ status: 404, message: 'invalid URI' });
    const record = await UserServices.getUserByUserName(username);
    if (!record) return res.status(404).json({ status: 404, message: 'user not found' });
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (error) { res.status(500).json({ status: 500, message: 'failed to retrieve user profile' }); }
};

// update a single user profile
const updateUserProfile = async (req, res) => {
  try {
    if (!res.locals) return res.status(500).json({ status: 500, message: 'can not receive locals' });
    const decodedToken = jwt.decode(res.locals);
    if (!decodedToken) return res.status(404).json({ status: 404, message: 'no token found' });
    const userId = decodedToken.data;
    if (!userId) return res.status(404).json({ status: 404, messae: 'unable to obtain a payload in token' });
    const record = await UserServices.getUserById(userId);
    if (!record) return res.status(404).json({ status: 404, message: 'user not found' });
    if (record.dataValues.id !== userId) return res.status(401).json({ status: 404, message: 'owner of profile does not match signed in user' });
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
  } catch (err) { res.status(500).json({ status: 500, message: 'failed to update a user' }); }
};
export { getUserProfile, updateUserProfile, getAllUsers };
