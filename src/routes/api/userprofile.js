import express from 'express';
import { updateUserProfile, getUserProfile } from '../../controllers/userprofile';
import verifyUserToken from '../../middlewares/usertokenverifcation';
import updateProfileInputsValidation from '../../middlewares/updateprofileinputsvalidation';

const router = express.Router();

// ------------------ get user profile -----------
router.get('/:username', verifyUserToken, getUserProfile);

// ------------------ update user profile --------
router.patch('/update-profile', verifyUserToken, updateProfileInputsValidation, updateUserProfile);

export default router;
