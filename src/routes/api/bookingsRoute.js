import express from 'express';
import { showBookings } from '../../controllers/bookingsController';
import permit from '../../middlewares/accessControl';


const router = express.Router();

router.get('/', permit (['book accommodations']),showBookings );

export default router;
