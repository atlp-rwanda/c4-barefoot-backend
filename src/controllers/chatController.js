import { Op } from 'sequelize';
import models from '../models';
import { verifyToken } from '../utils/auth';

// Getting users from user table to begin chat, this method is called when u have not yet chatted
export const getUsersToChatWith = async (req, res, next) => {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

// getting chats btn two users
export const getChatsBetweenTwoUsers = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await verifyToken(token);
    const loggedInUser = await models.User.findOne({
      where: {
        username: user.username
      }
    });
    const userToChatWith = await models.User.findOne({
      where: {
        id: req.params.id
      }
    });

    const chats = await models.Chat.findAll({
      where: models.Sequelize.or(
        models.Sequelize.and(
          { sender: loggedInUser.id, },
          { receiver: req.params.id }
        ),
        models.Sequelize.and(
          { sender: req.params.id },
          { receiver: loggedInUser.id }
        )
      )
    });
    res.status(200).json({
      currentUser: loggedInUser.username,
      otherUser: userToChatWith.username,
      chats
    });
  } catch (err) {
    next(err);
  }
};

export const postChat = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await verifyToken(token);
    // getting the user_id of the logged in user
    const loggedInUser = await models.User.findOne({
      where: {
        username: user.username
      }
    });
    const chatTo = await models.User.findOne({
      where: {
        id: req.body.to
      }
    });
    if (chatTo) {
      const chat = {
        message: req.body.chat_message,
        sender: loggedInUser.id,
        receiver: req.body.to,
      };

      const chat_message = await models.Chat.create(chat);
      console.log(chat_message);
      res.send(chat_message);
    } else {
      res.status(400).json({
        message: 'User does not exist'
      });
    }
  } catch (err) {
    next(err);
  }
};
export const deleteChatMessage = async (req, res, next) => {
  try {
    //
  } catch (err) {
    next(err);
  }
};
// Getting all chats for one user
export const allChats = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await verifyToken(token);
    const loggedInUser = await models.User.findOne({
      where: {
        username: user.username
      }
    });
    const chats = await models.Chat.findAll({
      where: {
        [Op.or]: {
          sender: loggedInUser.id,
          receiver: loggedInUser.id
        }
      }
    });

    res.status(200).json([loggedInUser.username, chats]);
  } catch (err) {
    next(err);
  }
};
