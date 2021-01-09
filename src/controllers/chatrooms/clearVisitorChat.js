import { Op } from 'sequelize';
import models from '../../models';

const clearVisitorChat = async () => {
  const now = new Date();
  now.setDate(now.getDate() - 15);
  const deleteBefore = now.toISOString();
  try {
    const chatV = await models.ChatV.destroy({
      where: {
        createdAt: {
          [Op.lt]: deleteBefore
        }
      }
    }).catch((err) => {
      console.log(err);
    });
    console.log(chatV);
  } catch (error) {
    console.log(error);
  }
};

setInterval(() => {
  console.log('>>>>>>>>>>>>>DELETE VISITORS CHATS<<<<<<<<<<<<<');
  clearVisitorChat();
}, 14400000); // Clears every 4 hours
