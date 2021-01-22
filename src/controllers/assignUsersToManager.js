import pusher from '../config/pusher';
import findUser from '../services/findUserById';
import models from '../models';
import sendNotificationEmail from '../middlewares/sendNotificationEmail';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';
import { createNotification } from '../services/notification';

const assignUsersToManager = async (req, res, next) => {
  const userId = req.params.id;
  const { manager_id } = req.body;
  try {
    const user = await findUser(userId);
    if (!user) {
      throw new NotFoundRequestError((`User with this ${userId} is not exist`), 404);
    }

    const newNotificantion = {
      user_id: userId,
      title: 'Assign user to manager',
      message: `You were assigned to manager of ${manager_id}`
    };
    models.User.update({ manager_id }, { where: { email: user.email } });

    const notification = await createNotification(newNotificantion);

    const notifiEmail = await sendNotificationEmail(user.email);

    res.status(200).json({ status: 200, message: `user was assigned to manager with this Id ${manager_id}` });
    next();
  } catch (error) {
    res.status(500).json({error:error.message, stack:error.stack});
  }
};
export default assignUsersToManager;
