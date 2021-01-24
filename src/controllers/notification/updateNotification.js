import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
import { findNotificationById, updateNotification } from '../../services/notification';
import { verifyToken } from '../../utils/auth';

const updateNotifications = async (req, res) => {
  const notificationId = req.params.id;
  const status = 'readed';
  const userData = req.headers.authorization;
  if (!userData) return res.status(401).json({ status: 401, message: ('Unauthorized, Please login!') });
  const token = userData.split(' ')[1];
  const decoded = await verifyToken(token);

  const notification = await findNotificationById(notificationId);
  if (!notification) throw new NotFoundRequestError(('notification not found'), 404);
  try {
    const updated = await updateNotification(notificationId);
    console.log(updated);
    return res.status(200).json({ status: 200, message: ('notification updated successful!') });
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
export default updateNotifications;
