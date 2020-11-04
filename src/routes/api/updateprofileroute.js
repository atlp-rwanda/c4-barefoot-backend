import express from 'express';
import { updateUserProfile } from '../../controllers/userprofile';
import verifyUserToken from '../../middlewares/userprofileverification';

const router = express.Router();

// ------------------ update user profile --------
router.patch('/', verifyUserToken, updateUserProfile);

export default router;
