import express from 'express';
import landingPage from './api/landingPageRoute';
import updateUserProfile from './api/updateprofileroute';
import getUserProfile from './api/userprofileroute';
import getAllUsers from './api/getallusersroute';
import userRoute from './api/user';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/update-profile', updateUserProfile);
routes.use('/:username', getUserProfile);
routes.use('/users', getAllUsers);

export default routes;
