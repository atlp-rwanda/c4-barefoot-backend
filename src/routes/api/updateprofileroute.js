import express from 'express';
import { updateUserProfile } from '../../controllers/userprofile';
import verifyUserToken from '../../middlewares/usertokenverifcation';

const router = express.Router();

// ------------------ update user profile --------
router.patch('/', verifyUserToken, updateUserProfile);

export default router;
