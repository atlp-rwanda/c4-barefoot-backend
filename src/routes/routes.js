import express from 'express';
import welcome from '../controllers/welcome';
import { getUserProfile, updateUserProfile } from '../controllers/userprofile';
import verifyUserToken from '../middlewares/userprofileverification';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);

// ------------------ get user profile -----------
router.get('/users/:userId', verifyUserToken, getUserProfile);

// ------------------ update user profile --------
router.patch('/users/:userId', verifyUserToken, updateUserProfile);

export default router;
