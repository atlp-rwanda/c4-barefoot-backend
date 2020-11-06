import express from 'express';
import indexRoutes from './index.routes';
import profileRoute from './profile.routes';

const routes = express.Router();
routes.use(indexRoutes);
routes.use(profileRoute);

export default routes;
