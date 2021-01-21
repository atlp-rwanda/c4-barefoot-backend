import express, { Router } from 'express';
import isLogedIn from '../../helper/isLogedIn';
import permit from '../../middlewares/accessControl';
import { getTotalOfTripsByLocation, getTripHistory } from '../../controllers/viewTripHistory';

const router = express.Router();
router.get('/:location', isLogedIn, permit(['view travel requests']), getTripHistory);
router.get('/', isLogedIn, permit(['view travel requests']), getTotalOfTripsByLocation);
export default router;