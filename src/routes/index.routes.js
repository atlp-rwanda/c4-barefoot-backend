import express from 'express';
import welcome from '../controllers/welcome';

const indexRoute = express.Router();

// ------------------Welcome route-----------------
indexRoute.get('/', welcome);

export default indexRoute;
