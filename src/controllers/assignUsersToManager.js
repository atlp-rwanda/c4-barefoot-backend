import findUser from '../services/findUserById';
import models from '../models';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';

const assignUsersToManager = async (req, res) => {
  const userId = req.params.id;
  const { manager_id } = req.body;
  try {
    const user = await findUser(userId);
    if (!user) {
      throw new NotFoundRequestError(`User with this ${userId} is not exist`, 404);
    }
    models.User.update({ manager_id }, { where: { email: user.email } });
    return res.status(200).json({ status: 200, message: `user was assigned to manager with this Id ${manager_id}` });
  } catch (error) {
    res.json(error.message);
  }
};
export default assignUsersToManager;
