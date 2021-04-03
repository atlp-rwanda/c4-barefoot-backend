import express from 'express';
import verifyUserToken from '../../middlewares/usertokenverification';
import {
  getChatList, getChatsBetweenTwoUsers, getUsersToChatWith, postChat, markAsRead,
  deleteChatMessage, visitorMessage, supportResponse, readAsVisitor, readAsSupport,
  getChatsV, getLastMessageBetweenTwo, getVisitorsList, getUnreadMessages, visitorGetsChatVs
} from '../../controllers/chatController';

const router = express.Router();

// get users to chat for the first time / or find new users to chat
router.get('/users', verifyUserToken, getUsersToChatWith);

// get messages between two registered users
router.get('/', verifyUserToken, getChatsBetweenTwoUsers);

// get number of unreads between two users
router.get('/unread', verifyUserToken, getUnreadMessages);

// get last message between two users
router.get('/last', verifyUserToken, getLastMessageBetweenTwo);

// get chatlist for one user
router.get('/chatlist', verifyUserToken, getChatList);

// post / send your message to other registered user
router.post('/', verifyUserToken, postChat);

// mark the message as read ( status to `true` ) by receiver
router.patch('/read', verifyUserToken, markAsRead);

// delete a chat if you are the sender
router.delete('/', verifyUserToken, deleteChatMessage);

// visitor sends message to support
router.post('/visitor', visitorMessage);

// visitor gets messages from support
router.get('/visitor', visitorGetsChatVs);

// visitor reads the support message
router.patch('/visitor', readAsVisitor);

// support responds to visitor
router.post('/support', verifyUserToken, supportResponse);

// support reads the visitor message
router.patch('/support', verifyUserToken, readAsSupport);

// support gets list of visitors chatting
router.get('/visitors', verifyUserToken, getVisitorsList);

// support gets the visitor's message
router.get('/support', verifyUserToken, getChatsV);

export default router;
