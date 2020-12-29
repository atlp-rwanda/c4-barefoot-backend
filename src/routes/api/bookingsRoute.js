import express from 'express';
import bookingsController from '../../controllers/bookingsController';
import permit from '../../middlewares/accessControl';

const router = express.Router();

router.get('/', permit(['book accommodations']), bookingsController);

export default router;
