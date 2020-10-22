import express from 'express';
<<<<<<< HEAD
import indexRoutes from './index.routes';
import profileRoute from './profile.routes';

const routes = express.Router();
routes.use(indexRoutes);
routes.use(profileRoute);

export default routes;
=======
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
>>>>>>> added verifying user before get and update user profile
