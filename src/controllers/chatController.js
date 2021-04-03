import { Op } from 'sequelize';
import models from '../models';
import { verifyToken } from '../utils/auth';
import ApplicationError from '../utils/Errors/applicationError';

// Getting users to begin chat, this is called when user has not yet chatted
export const getUsersToChatWith = async (req, res, next) => {
  try {
    const users = await models.User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'profile_picture']
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
        id: req.query.id
      },
      attributes: ['id']
    });

    const chats = await models.Chat.findAll({
      where: models.Sequelize.or(
        models.Sequelize.and(
          { sender: loggedInUser.id, },
          { receiver: userToChatWith.id }
        ),
        models.Sequelize.and(
          { sender: userToChatWith.id },
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

// getting chats between two users
export const getLastMessageBetweenTwo = async (req, res, next) => {
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
        id: req.query.id
      },
      attributes: ['id']
    });

    if (userToChatWith instanceof models.User) {
      const lastMessage = await models.Chat.findOne({
        where: {
          [Op.and]: {
            sender: {
              [Op.or]: [userToChatWith.id, loggedInUser.id]
            },
            receiver: {
              [Op.or]: [userToChatWith.id, loggedInUser.id]
            }
          }
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
      res.status(200).json(lastMessage);
    } else {
      throw new ApplicationError('User not found', 404);
    }
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
        id: req.body.receiver
      },
      attributes: ['id']
    });
    if (chatTo) {
      const chatMessage = await models.Chat.create({
        sender: loggedInUser.id,
        receiver: chatTo.id,
        message: req.body.message,
        type: req.body.type
      });
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
        id: req.query.id,
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
      attributes: ['id', 'first_name', 'last_name', 'profile_picture']
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
    const sender = await models.User.findOne({
      where: {
        id: req.query.sender,
      },
      attributes: ['id']
    });
    if (sender) {
      await models.Chat.update(
        { status: true },
        {
          where: {
            receiver: receiver.id,
            sender: sender.id
          }
        }
      );
      res.status(200).json({
        message: 'marked as read',
        sender: sender.id,
        receiver: receiver.id
      });
    } else {
      res.status(404).send({
        message: 'user not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

// visitor message incomming
export const visitorMessage = async (req, res, next) => {
  try {
    const chatV = {};
    chatV.message = req.body.message;
    chatV.receiver = 'support-team';
    chatV.sender = req.body.sender;
    chatV.type = req.body.type;
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
      attributes: ['email']
    });
    const visitor = await models.ChatV.findOne({
      where: {
        [Op.or]: {
          receiver: req.body.visitor,
          sender: req.body.visitor
        }
      }
    });
    if (visitor) {
      chatV.sender = loggedInUser.email;
      chatV.message = req.body.message;
      chatV.type = req.body.type;
      chatV.receiver = req.body.visitor;
      const newChatV = await models.ChatV.create(chatV);
      res.status(200).json(newChatV);
    } else {
      res.status(404).json({
        message: 'visitor not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

// visitor reads the support message
export const readAsVisitor = async (req, res, next) => {
  try {
    const visitor = await models.ChatV.findOne({
      where: {
        [Op.or]: {
          receiver: req.query.visitor,
          sender: req.query.visitor,
        }
      }
    });
    if (visitor) {
      await models.ChatV.update(
        { status: true },
        {
          where: {
            receiver: req.query.visitor,
            sender: {
              [Op.ne]: req.query.visitor
            }
          }
        }
      );
      res.status(200).send({
        message: 'marked as read!'
      });
    } else {
      res.status(404).send({
        message: 'User not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

// read visitor's messages as any from support
export const readAsSupport = async (req, res, next) => {
  try {
    const visitor = await models.ChatV.findOne({
      where: {
        receiver: 'support-team',
        sender: req.query.visitor,
      }
    });
    if (visitor) {
      await models.ChatV.update(
        { status: true },
        {
          where: {
            sender: visitor.sender,
            receiver: 'support-team'
          }
        }
      );
      res.status(200).send({
        message: 'marked as read!'
      });
    } else {
      res.status(404).send({
        message: 'visitor not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

// get chats between visitor and support teams
export const getChatsV = async (req, res, next) => {
  try {
    const chatsV = await models.ChatV.findAll({
      where: {
        [Op.or]: {
          sender: req.query.visitor,
          receiver: req.query.visitor
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).send(chatsV);
  } catch (error) {
    next(error);
  }
};

export const getVisitorsList = async (req, res, next) => {
  try {
    const chats = await models.ChatV.findAll({
      where: {
        receiver: 'support-team'
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    const chatListVisitors = new Set();
    chats.forEach((chat) => {
      chatListVisitors.add(chat.sender);
    });
    res.status(200).json(Array.from(chatListVisitors));
  } catch (err) {
    next(err);
  }
};

export const getUnreadMessages = async (req, res, next) => {
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
        id: req.query.id
      },
      attributes: ['id']
    });

    if (userToChatWith instanceof models.User) {
      const unreadMessages = await models.Chat.findAndCountAll({
        where: {
          sender: userToChatWith.id,
          receiver: loggedInUser.id,
          status: false
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
      res.status(200).json({
        currentUser: loggedInUser.id,
        otherUser: userToChatWith.id,
        unreadMessages
      });
    } else {
      throw new ApplicationError('User not found', 404);
    }
  } catch (err) {
    next(err);
  }
};

export const visitorGetsChatVs = async (req, res, next) => {
  try {
    const chatVs = await models.ChatV.findAll({
      where: {
        [Op.or]: {
          receiver: req.query.visitor,
          sender: req.query.visitor
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    if (chatVs) {
      chatVs.forEach((chat) => {
        if (chat.sender !== req.query.visitor) {
          chat.sender = 'support-team';
        }
      });
      res.status(200).json(chatVs);
    } else {
      res.status(401).send({
        message: 'You have not been here before'
      });
    }
  } catch (error) {
    next(error);
  }
};
