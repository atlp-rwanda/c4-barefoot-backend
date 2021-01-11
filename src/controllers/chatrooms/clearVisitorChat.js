import { Op } from 'sequelize';
import models from '../../models';

const clearVisitorChat = async () => {
  const now = new Date();
  const lifetime = process.env.VISITOR_CHAT_LIFETIME || 15;
  now.setDate(now.getDate() - lifetime);
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
