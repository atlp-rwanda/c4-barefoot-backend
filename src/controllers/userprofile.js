// get a user profile
const getUserProfile = (req, res) => {
  res.status(200).json({ status: 200, message: 'succesfull got user profile' });
};

// update a single user profile
const updateUserProfile = (req, res) => {
  res.status(200).json({ status: 200, message: 'succesfull update your profile' });
};

export { getUserProfile, updateUserProfile };
