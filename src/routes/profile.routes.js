import express from 'express';
import { getUserProfile, updateUserProfile, getAllUsers } from '../controllers/userprofile';
import verifyUserToken from '../middlewares/userprofileverification';

const profileRoute = express.Router();
// ----------------- get all users ------------
profileRoute.get('/users', verifyUserToken, getAllUsers);
// ------------------ get user profile -----------
profileRoute.get('/:userId', verifyUserToken, getUserProfile);

// ------------------ update user profile --------
profileRoute.patch('/:userId', verifyUserToken, updateUserProfile);

export default profileRoute;
