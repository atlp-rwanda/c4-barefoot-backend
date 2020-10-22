import jwt from 'jsonwebtoken';
import models from '../models';
import 'dotenv/config';

// get a user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const record = await models.User.findOne({ where: { id: userId } });
    if (!record) return res.status(404).json({ message: 'user not found' });
    res.status(200).json({ message: 'successful got user profile' });
  } catch (error) { res.status(404).json({ message: 'no profile associate with that user' }); }
};

// update a single user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const record = await models.User.findOne({ where: { id: userId } });
    if (!record) return res.status(404).json({ message: 'user not found' });
    const decodedToken = jwt.decode(res.locals);
    if (req.params.userId !== `${decodedToken.id}`) return res.status(401).json({ message: 'owner of profile does not match signed in user' });
    const updateUser = await models.User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        address: req.body.address,
        language: req.body.language,
        occupation: req.body.occupation,
        profile_picture: req.body.profile_picture
      },
      {
        where: { id: req.params.userId }
      }
    );
    res.status(200).json({ message: 'successfully updated user profile' });
  } catch (err) { res.status(500).json({ message: 'failed to update a user' }); }
};

export { getUserProfile, updateUserProfile };
