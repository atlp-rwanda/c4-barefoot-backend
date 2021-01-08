import express from 'express';
import verifyUserToken from '../../middlewares/usertokenverification';
import {
  getChatList, getChatsBetweenTwoUsers, getUsersToChatWith, postChat, markAsRead,
} from '../../controllers/chatController';

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

module.exports = router;
