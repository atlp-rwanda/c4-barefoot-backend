import express from 'express';
import welcome from '../controllers/welcome';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);

export default router;
