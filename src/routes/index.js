import express from 'express';
import landingPage from './api/landingPageRoute';
import updateUserProfile from './api/updateprofileroute';
import getUserProfile from './api/userprofileroute';
import userRoute from './api/user';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/update-profile', updateUserProfile);
routes.use('/', getUserProfile);

export default routes;
