import models from '../models';

export const createNotification = async (data) => {
  const notification = await models.Notification.create(data);
  return notification;
};

export const findAllNotification = async (data) => {
  const notification = await models.Notification.findAndCountAll({ where: { user_id: data } });
  return notification;
};

export const findNotificationById = async (data) => {
  const notification = await models.Notification.findOne({ where: { id: data } });
  return notification;
};
export const updateNotification = async (data) => {
  const notification = await models.Notification.update({ status: 'readed' }, { where: { id: data } });
  return notification;
};
