import express from 'express';
<<<<<<< HEAD
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
<<<<<<< HEAD
import verifyUserToken from '../middlewares/userprofileverification';
=======
import indexRoutes from './index.routes';
import profileRoute from './profile.routes';
>>>>>>> separated data and business logic and added get all users endpoint
=======
import { verifyUserToken, verifyUser } from '../middlewares/userprofileverification';
>>>>>>> added verifying user before get and update user profile

const routes = express.Router();
routes.use(indexRoutes);
routes.use(profileRoute);

<<<<<<< HEAD
// ------------------Welcome Page-----------------

router.get('/', welcome);

// ------------------ get user profile -----------
router.get('/users/:userId', verifyUserToken, getUserProfile);

// ------------------ update user profile --------
<<<<<<< HEAD
router.patch('/users/:userId', verifyUserToken, updateUserProfile);
=======
router.patch('/users/:userId', verifyUser, updateUserProfile);
>>>>>>> added verifying user before get and update user profile

export default router;
>>>>>>> added verifying user before get and update user profile
=======
export default routes;
>>>>>>> separated data and business logic and added get all users endpoint
