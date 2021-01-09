import express from 'express';
import verifyUserToken from '../../middlewares/usertokenverification';
import {
  getChatList, getChatsBetweenTwoUsers, getUsersToChatWith, postChat, markAsRead, deleteChatMessage,
  visitorMessage, supportResponse, readAsVisitor, readAsSupport
} from '../../controllers/chatController';
import permit from '../../middlewares/accessControl';

const router = express.Router();

// loading users for the first time
router.get('/loadUsers', verifyUserToken, getUsersToChatWith);

// router.get('/recentChats', verifyUserToken, getRecentChatUsers);
router.get('/:id', verifyUserToken, getChatsBetweenTwoUsers);

// getting chats for one user
router.get('/chatlist/me', verifyUserToken, getChatList);

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

export default router;
