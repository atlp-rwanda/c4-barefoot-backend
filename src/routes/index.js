import express from 'express';
import landingPage from './api/landingPageRoute';
import userProfile from './api/userprofile';
import userRoute from './api/user';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/', userProfile);

export default routes;
