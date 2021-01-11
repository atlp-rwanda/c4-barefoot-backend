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
import passport from "passport";
import cookieSession from 'cookie-session';
import i18n from './controllers/i18n';
import newUserConnection from './controllers/chatrooms/chat';


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

const port = process.env.PORT || 3000;

// routes
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//initializing internationalization
app.use(i18n.init);


// routes
app.use('/api/v1/', routes);
// app.use(cors());

// documentation route
const swaggerDocs = swaggerJsDoc(swaggerConfigs);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// catch all 404 errors
app.all('*', (req, res, next) => {
  const err = new ApplicationError(res.__('Page Requested not found'), 404);
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
io.on('connection', newUserConnection);

export default app;
