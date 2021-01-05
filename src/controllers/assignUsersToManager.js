import pusher from '../config/pusher';
import findUser from '../services/findUserById';
import models from '../models';
import sendNotificationEmail from '../middlewares/sendNotificationEmail';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';
import { createNotification } from '../services/notification';

const assignUsersToManager = async (req, res) => {
  const userId = req.params.id;
  const { manager_id } = req.body;
  try {
    const user = await findUser(userId);
    if (!user) {
      throw new NotFoundRequestError(`User with this ${userId} is not exist`, 404);
    }

    const newNotificantion = {
      user_id: userId,
      title: 'Assign user to manager',
      message: `You were assigned to manager of ${manager_id}`
    };
    models.User.update({ manager_id }, { where: { email: user.email } });

    const notification = await createNotification(newNotificantion);

    pusher.trigger('bare-foot-normad', 'notification', { notification });
    const notifiEmail = await sendNotificationEmail(user.email);

    return res.status(200).json({ status: 200, message: `user was assigned to manager with this Id ${manager_id}` });
  } catch (error) {
<<<<<<< HEAD
    res.json(error.message, error.stack);
=======
    res.status(500).json({error:error.message, stack:error.stack});
>>>>>>> main
  }
};
export default assignUsersToManager;
