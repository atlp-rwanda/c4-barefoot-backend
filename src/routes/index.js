import express from 'express';
import landingPage from './api/landingPageRoute';
import userProfile from './api/userprofile';
import userRoute from './api/user';
import adminRoutes from './api/adminRoutes';
import permit from '../middlewares/accessControl';
import travelRequestroutes from './api/travelRequestRoutes'
import directreportsRoutes from './api/directReports'

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/requests/', travelRequestroutes);
routes.use('/directReports', directreportsRoutes);
routes.use('/', landingPage);
routes.use('/admin', permit(["all"]), adminRoutes);

routes.use('/', userProfile);

export default routes;
