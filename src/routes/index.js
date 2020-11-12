import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import travelRequestroutes from './api/travelRequestRoutes'
import directreportsRoutes from './api/directReports'

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/requests/', travelRequestroutes)
routes.use('/directReports', directreportsRoutes)
routes.use('/', landingPage);

export default routes;
