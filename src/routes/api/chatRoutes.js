import express from 'express';
import verifyUserToken from '../../middlewares/usertokenverification';
const router = express.Router();

import {allChats, getChatsBetweenTwoUsers, getUsersToChatWith, postChat } from '../../controllers/chatController'

//loading users for the first time
router.get('/loadUsers', verifyUserToken, getUsersToChatWith);
//loading users u recently chatted with

// router.get('/recentChats', verifyUserToken, getRecentChatUsers);
router.get('/:id', verifyUserToken, getChatsBetweenTwoUsers);
//getting chats for one user
router.get('/', verifyUserToken, allChats);

router.post('/', verifyUserToken, postChat);


module.exports = router;