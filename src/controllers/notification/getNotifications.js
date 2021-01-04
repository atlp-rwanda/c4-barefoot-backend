import Pusher from 'pusher';
import findUser from '../../services/findUserById';
import models from '../../models';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
import { verifyToken } from '../../utils/auth';
import isUserExist from '../../services/findUserByUsername';

const notific = async (req, res) => {
  const userData = req.headers.authorization;
  if (!userData) return res.status(401).json({ status: 401, message: res.__('Unauthorized, Please login!') });
  const token = userData.split(' ')[1];
  const decoded = await verifyToken(token);
  const user = await isUserExist(decoded.username);
  try {
    const notifications = await models.Notification.findAndCountAll({
      where: { user_id: user.id }
    });

    return res.status(200).json({ status: 200, message: " user's Notifications", notifications });
  } catch (error) {
    res.json(error.message, error.stack);
  }
};
export default notific;
