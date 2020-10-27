import jwt from 'jsonwebtoken';
import UserServices from '../services/user.service';

// get all users in database
const getAllUsers = async (req, res) => {
  try {
    const { page } = req.query;
    const options = {
      attributes: ['id', 'first_name'],
      page, // Default 1
      paginate: 10, // Default 25
      order: [['first_name', 'DESC']],
    };
    const record = await UserServices.getAllUsers(options);
    if (record.pages < page) return res.status(404).json({ message: `only ${record.pages} pages available` });
    res.status(200).json({ message: 'successful got user profile' });
  } catch (err) { res.status(404).json({ message: 'no user found' }); }
};

// get a user profile with either Id or first_name
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const record = await UserServices.getUserById(userId);
    if (!record) return res.status(404).json({ message: 'user not found' });
    res.status(200).json({ message: 'successful got user profile' });
  } catch (error) { res.status(404).json({ message: 'no profile associate with that user' }); }
};

// update a single user profile by comparing from tokenId and id from database
const updateUserProfile = async (req, res) => {
  try {
    const decodedToken = jwt.decode(res.locals);
    const record = await UserServices.getUserById(decodedToken.id);
    if (!record) return res.status(404).json({ message: 'user not found' });
    if (record.dataValues.id !== decodedToken.id) return res.status(401).json({ message: 'owner of profile does not match signed in user' });
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      address: req.body.address,
      language: req.body.language,
      occupation: req.body.occupation,
      profile_picture: req.body.profile_picture
    };
    UserServices.updateUser(data, decodedToken.id);
    res.status(200).json({ message: 'successfully updated user profile' });
  } catch (err) { res.status(500).json({ message: 'failed to update a user' }); }
};

export { getUserProfile, updateUserProfile, getAllUsers };
