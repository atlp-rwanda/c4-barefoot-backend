import Pusher from 'pusher';
import findUser from '../../services/findUserById';
import models from '../../models';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
import { verifyToken } from '../../utils/auth';
import isUserExist from '../../services/findUserByUsername';
import { Op } from 'sequelize'

export const readedNotific = async (req, res) => {
  const userData = req.headers.authorization;
  if (!userData) return res.status(401).json({ status: 401, message: ('Unauthorized, Please login!') });
  const token = userData.split(' ')[1];
  const decoded = await verifyToken(token);
  const user = await isUserExist(decoded.username);
  console.log(user)
  try {
   

    const notifications = await models.Notification.findAndCountAll({
      where: { 
        [Op.and]: {
          user_id: user.id,
          status: 'readed'
        }
       
      }
    });
    return res.status(200).json({ status: 200, message: ('user\'s Notifications'), notifications });
  } catch (error) {
    console.log('catch')
    res.json(error);
  }
};

export const unReadedNotific = async (req, res)=>{
  const userData = req.headers.authorization;
  if (!userData) return res.status(401).json({ status: 401, message: ('Unauthorized, Please login!') });
  const token = userData.split(' ')[1];
  const decoded = await verifyToken(token);
  const user = await isUserExist(decoded.username);
  console.log(user)
  try {
   

    const notifications = await models.Notification.findAndCountAll({
      where: { 
        [Op.and]: {
          user_id: user.id,
          status: 'not readed'
        }
       
      }
    });
    return res.status(200).json({ status: 200, message: ('user\'s Notifications'), notifications });
  } catch (error) {
    console.log('catch')
    res.json(error);
  }
}