import { Op } from 'sequelize';
import models from '../models';
import { verifyToken } from '../utils/auth';

// Getting users to begin chat, this is called when user has not yet chatted
export const getUsersToChatWith = async (req, res, next) => {
  try {
    const users = await models.User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'username', 'occupation',
        'bio', 'user_role_id', 'manager_id', 'profile_picture', 'language', 'address']
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
      },
      attributes: ['id']
    });
    const userToChatWith = await models.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id']
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
      ),
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).json({
      currentUser: loggedInUser.id,
      otherUser: userToChatWith.id,
      chats
    });
  } catch (err) {
    next(err);
  }
};

// send chatMessage to someone registered
export const postChat = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await verifyToken(token);
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

// delete a message if you are the sender
export const deleteChatMessage = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const user = await verifyToken(token);
  const currentUser = await models.User.findOne({
    where: { username: user.username },
    attributes: ['id']
  });
  try {
    const chat = await models.Chat.findOne({
      where: {
        uuid: req.body.id,
        sender: currentUser.id
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

// visitor message incomming
export const visitorMessage = async (req, res, next) => {
  try {
    const chatV = {};
    chatV.visitor = req.body.visitor;
    chatV.message = req.body.message;
    chatV.sender = chatV.visitor;
    const newChatV = await models.ChatV.create(chatV);
    res.status(200).json(newChatV);
  } catch (error) {
    next(error);
  }
};

// response from support to visitor
export const supportResponse = async (req, res, next) => {
  try {
    const chatV = {};
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await verifyToken(token);
    const loggedInUser = await models.User.findOne({
      where: { username: user.username },
      attributes: ['id', 'email']
    });
    chatV.sender = loggedInUser.email;
    chatV.message = req.body.message;
    chatV.visitor = req.body.visitor;

    const newChatV = await models.ChatV.create(chatV);
    return res.status(200).json(newChatV);
  } catch (error) {
    next(error);
  }
};
