import express from 'express';
import getAllUsers from '../../controllers/users';
import verifyUserToken from '../../middlewares/userprofileverification';

const router = express.Router();
// ----------------- get all users ------------
router.get('/', verifyUserToken, getAllUsers);

export default router;
