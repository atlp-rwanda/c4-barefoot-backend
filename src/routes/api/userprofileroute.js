import express from 'express';
import { getUserProfile } from '../../controllers/userprofile';
import verifyUserToken from '../../middlewares/userprofileverification';

const router = express.Router();

// ------------------ get user profile -----------
router.get('/:username', verifyUserToken, getUserProfile);

export default router;
