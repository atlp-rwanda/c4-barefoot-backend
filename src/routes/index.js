import express from 'express';
import landingPage from './api/landingPageRoute';
<<<<<<< HEAD
import userProfile from './api/userprofile';
=======
import updateUserProfile from './api/updateprofileroute';
import getUserProfile from './api/userprofileroute';
>>>>>>> refactoring controllers and middlewares
import userRoute from './api/user';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
<<<<<<< HEAD
routes.use('/', userProfile);
=======
routes.use('/update-profile', updateUserProfile);
routes.use('/', getUserProfile);
>>>>>>> refactoring controllers and middlewares

export default routes;
