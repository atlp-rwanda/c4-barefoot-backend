import pusher from '../config/pusher';
import findUser from '../services/findUserById';
import models from '../models';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';
import { createNotification } from '../services/notification';
import sendEmail from '../helper/sendEmail';

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


    const mailOptions = {
      email: user.email,
      subject: 'Verify your email',
      html: `<p>
			Hi Lynda,</br>                                                                                                         
            Hope this email finds you well. Thank you for sending your request at</br>
            Barefoot nomad ,You have been  successfully assigned to the manager.                                   
		</p>
		<p>Kindly regard</p>`
    };
    const sendmail = await sendEmail(mailOptions);

    res.status(200).json({ status: 200, message: `user was assigned to manager with this Id ${manager_id}` });
    next();
  } catch (error) {
    res.status(500).json({error:error.message, stack:error.stack});
  }
};
export default assignUsersToManager;
