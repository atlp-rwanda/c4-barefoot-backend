import { Op } from 'sequelize';
import models from '../models';
import { verifyToken } from '../utils/auth';

// Getting users to begin chat, this is called when user has not yet chatted
export const getUsersToChatWith = async (req, res, next) => {
  try {
    const users = await models.User.findAll({

    });
    res.send(users);
  } catch (err) {
    next(err);
  }
};

// getting chats between two users
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

      const chatMessage = await models.Chat.create(chat);
      console.log(chatMessage);
      res.send(chatMessage);
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
    const chat = await models.Chat.findOne({
      where: {
        uuid: req.body.id
      }
    });
    if (chat) {
      await chat.destroy();
      res.status(200).json({
        message: 'Message deleted'
      });
    } else {
      res.status(400).json({
        message: 'Message not available'
      });
    }
  } catch (err) {
    next(err);
  }
};

// Get all chatList for one user
export const getChatList = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await verifyToken(token);
    const loggedInUser = await models.User.findOne({
      where: {
        username: user.username
      },
      attributes: ['id']
    });
    const chats = await models.Chat.findAll({
      where: {
        [Op.or]: {
          sender: loggedInUser.id,
          receiver: loggedInUser.id
        }
      },
      attributes: ['sender', 'receiver']
    });
    const chatListIds = new Set();
    chats.forEach((chat) => {
      chatListIds.add(chat.sender);
      chatListIds.add(chat.receiver);
    });
    if (chatListIds.has(loggedInUser.id)) {
      chatListIds.delete(loggedInUser.id);
    }
    const chatList = await models.User.findAll({
      where: {
        id: Array.from(chatListIds)
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'username', 'occupation',
        'user_role_id', 'manager_id', 'profile_picture', 'language', 'address'
      ]
    });
    res.status(200).json(chatList);
  } catch (err) {
    next(err);
  }
};

// mark chat message as read
export const markAsRead = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await verifyToken(token);
    const receiver = await models.User.findOne({
      where: {
        username: user.username
      },
      attributes: ['id']
    });
    await models.Chat.update(
      { status: true },
      {
        where: {
          receiver: receiver.id,
          sender: req.body.sender
        }
      }
    );
    return res.status(200).json({
      message: 'marked as read'
    });
  } catch (error) {
    next(error);
  }
};
