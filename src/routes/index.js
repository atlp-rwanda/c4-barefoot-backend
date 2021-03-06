import express from 'express';
import landingPage from './api/landingPageRoute';
import userProfile from './api/userprofile';
import userRoute from './api/user';
import travelRequestroutes from './api/travelRequestRoutes';
import directreportsRoutes from './api/directReports';
import tRequestsCommentsRoutes from './api/travelCommentsRoutes';
import managerRouter from './api/assignUserToManager';
import adminRoutes from './api/adminRoutes';
import permit from '../middlewares/accessControl';
import locationsRoute from './api/locationsRoute';
import accommodationRoute from './api/accommodationsRoute';
import amenityRoute from './api/amenityRoute';
import reviewsRoutes from './api/ratesAndReviewsRoutes';
import bookingsRoute from './api/bookingsRoute';
import notiRoute from './api/notification';

import currencyConverter from './api/currencyConverter';
import weatherData from './api/weatherApi';

import triproute from './api/tripRoute'

//import signinWithGoogleRoute from "./api/signinWithGooglerRoute";
import chatRoom from './api/chatRoutes';

import signinWithGoogleRoute from "./api/signinWithGooglerRoute";
import statistics from "./api/statistics";
const routes = express.Router();

routes.use('/user', userRoute);

routes.use('/weather', weatherData);
routes.use('/convert', currencyConverter);

routes.use('/requests', travelRequestroutes);
routes.use('/directReports', directreportsRoutes);
routes.use('/comment', tRequestsCommentsRoutes);
routes.use('/ratings', reviewsRoutes);
routes.use('/assignUserstoManager', managerRouter);
routes.use('/', landingPage);
routes.use('/locations', locationsRoute);
routes.use('/accommodations', accommodationRoute);
routes.use('/amenities', amenityRoute);
routes.use('/admin', permit(['all']), adminRoutes);
routes.use('/bookings', bookingsRoute);
routes.use('/profile', userProfile);
routes.use('/notification', notiRoute);
routes.use('/trips', triproute);
routes.use('/google', signinWithGoogleRoute);
routes.use('/chat', chatRoom);
routes.use('/statistics', statistics);

export default routes;
