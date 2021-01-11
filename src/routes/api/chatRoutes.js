import express from 'express';
import verifyUserToken from '../../middlewares/usertokenverification';
import {
  getChatList, getChatsBetweenTwoUsers, getUsersToChatWith, postChat, markAsRead,
  deleteChatMessage, visitorMessage, supportResponse, readAsVisitor, readAsSupport,
  getChatsV, getLastMessageBetweenTwo, getVisitorsList, getUnreadMessages
} from '../../controllers/chatController';

const router = express.Router();

// loading users for the first time
router.get('/users', verifyUserToken, getUsersToChatWith);

// router.get('/recentChats', verifyUserToken, getRecentChatUsers);
router.get('/', verifyUserToken, getChatsBetweenTwoUsers);

// get number of unreads between two users
router.get('/unread', verifyUserToken, getUnreadMessages);

// get last message between two users
router.get('/last', verifyUserToken, getLastMessageBetweenTwo);

// getting chats for one user
router.get('/chatlist', verifyUserToken, getChatList);

// loading users you recently chatted with
router.post('/', verifyUserToken, postChat);

// mark the message status to `true` by receiver
router.patch('/read', verifyUserToken, markAsRead);

// delete a chat
router.delete('/', verifyUserToken, deleteChatMessage);

// visitor's messages incoming
router.post('/visitor', visitorMessage);

// visitor reads the support message
router.patch('/visitor', readAsVisitor);

// support's response to visitor
router.post('/support', verifyUserToken, supportResponse);

// support reads the visitor message
router.patch('/support', verifyUserToken, readAsSupport);

// support gets list of visitors chatting
router.get('/visitors', verifyUserToken, getVisitorsList);

// support gets the visitor's message
router.get('/visitor', verifyUserToken, getChatsV);

export default router;
