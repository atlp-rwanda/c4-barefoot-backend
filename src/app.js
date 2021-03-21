import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import http from 'http';
import socketio from 'socket.io';
import db from './models/index';
import routes from './routes/index';
import ApplicationError from './utils/Errors/applicationError';
import swaggerConfigs from './config/swaggerDoc';
import path from 'path'

import passport from "passport";
import cookieSession from 'cookie-session';
import i18n from './controllers/i18n';
import { handshake, userConnection } from './controllers/chatrooms/chat';
import './controllers/chatrooms/clearVisitorChat';
import cron from 'node-cron';
import { expiredBookings } from '../src/controllers/bookingsController';

// const expired = new Checkout();

import location from './controllers/locations'



const app = express();
const server = http.createServer(app);
export const io = socketio(server, {
  cors: {
    origin: '*'
  }
});
app.use(cors());
app.use(cookieParser());
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());


// app.use((req, res, next) => {
//   req.location = 'location';
//   next ();
// })

const port = process.env.PORT || 4000;

// routes
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//initializing internationalization
app.use(i18n.init);


// routes
app.use('/api/v1/', routes);
// app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


// documentation route
const swaggerDocs = swaggerJsDoc(swaggerConfigs);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// catch all 404 errors
app.all('*', (req, res, next) => {
  const err = new ApplicationError(('Page Requested not found'), 404);
  next(err);
});

// db connection check
const { sequelize } = db;
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ status: statusCode, error: err.message, stack: err.stack });
  next(err);
});

server.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}  ...`);
}).on('error', (err) => {
  if (err.errno === 'EADDRINUSE') {
    console.log(`----- Port ${port} is busy, trying with port ${port + 1} -----`);
    server.listen(port + 1);
  } else {
    console.log(err);
  }
});
cron.schedule('* * * * *', () => {
<<<<<<< HEAD
  expiredBookings();
=======
 expiredBookings();
>>>>>>> upadating branch to main
});

//chat handler
io.use(handshake).on("connection", userConnection);

export default app;

<<<<<<< HEAD
// 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
// SIGNIN_CLIENT_ID=516433117857-286j7mbmh4c3s03dfqrkvm9io3o9075g.apps.googleusercontent.com
// SIGNIN_CLIENT_SECRET=F_7jOdSqzOvQTdj889GeBS6y
// SIGNIN_REDIECT_URL=http://localhost:3000/api/v1/google/signin/check





// 706682876120-t11q38b8brmdr2bce5ugcnrlfl4ei8f4.apps.googleusercontent.com
// O6IeJVDLaFj5RPQ9a6-DtdWj



// SIGNIN_CLIENT_ID=516433117857-286j7mbmh4c3s03dfqrkvm9io3o9075g.apps.googleusercontent.com
// SIGNIN_CLIENT_SECRET=F_7jOdSqzOvQTdj889GeBS6y
// SIGNIN_REDIECT_URL=http://localhost:3000/api/v1/google/signin/check



1//04F8mTg9uoagqCgYIARAAGAQSNwF-L9Irim7Z_YUyufgjVFkkcV7NWkswRPlI1JFv7ghPUmlOu5K_3HStUNlMf5OcrD3A-sabXi4
// ya29.a0AfH6SMDrNJb4XR88kLT7EDY2Z69CsLkHZ5QGUEp3hG0nWaND8QC3-8QI5DfwlfrI-5zCkJvEGIz3SQUvlaIUo7HYnN_3JVnbpQYYFriKhJ3ad9u5xDzcVVlQi6QpmfHlMvyv3PVkIhEDRPc80yqfBN4tlXyJ
=======
>>>>>>> upadating branch to main
