import Pusher from 'pusher';
import findUser from '../../services/findUserById';
import models from '../../models';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
import { verifyToken } from '../../utils/auth';
import isUserExist from '../../services/findUserByUsername';

const notific = async (req, res) => {
  const userData = req.headers.authorization;
  if (!userData) return res.status(401).json({ status: 401, message: ('Unauthorized, Please login!') });
  const token = userData.split(' ')[1];
  const decoded = await verifyToken(token);
  const user = await isUserExist(decoded.username);
  try {
    const [count, unread] = await models.Notification.findAndCountAll({
      where: {
        user_id: user.id,
        status: "not readed"
      }
    })

    const notifications = await models.Notification.find({
      where: { 
        user_id: user.id,
        status: 'readed'
      }
    });
    console.log(count);
    return res.status(200).json({ status: 200, message: ('user\'s Notifications'), readNotifications:notifications,unreadCount:count, unReadNotifications:unread });
  } catch (error) {
    res.json(error.message, error.stack);
  }
};
export default notific;
