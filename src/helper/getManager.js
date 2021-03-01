import models from '../models';

//get managers
const getManagers = async (req, res) => {
  const availableManager = await models.User.findAll({
    attributes: [
      'id', 'first_name', 'last_name', 'profile_picture', 'email', 'username', 'address'
    ],
    include: [{
      model: models.Role,
      as: 'user_role',
      where: {
        name: 'manager'
      }
    }]
  });
  return availableManager;
};

module.exports = getManagers;
