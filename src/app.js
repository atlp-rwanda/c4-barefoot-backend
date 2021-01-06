import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import db from './models/index';
import routes from './routes/index';
import ApplicationError from './utils/Errors/applicationError';
import swaggerConfigs from './config/swaggerDoc';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(cookieParser());



// routes
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./src/public'));

// routes
app.use('/api/v1/', routes);
// app.use(cors());

// documentation route
const swaggerDocs = swaggerJsDoc(swaggerConfigs);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// catch all 404 errors
app.all('*', (req, res, next) => {
  const err = new ApplicationError('Page Requested not found', 404);
  next(err);
});

// db connection check
const { sequelize } = db;
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

//Run when client connect
io.on('connection', socket=>{
  socket.emit('welcome', 'Welcome to the chat area');
  

});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ status: statusCode, error: err.message, stack: err.stack });
  next(err);
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}  ...`);
}).on('error', (err) => {
  if (err.errno === 'EADDRINUSE') {
    console.log(`----- Port ${port} is busy, trying with port ${port + 1} -----`);
    app.listen(port + 1);
  } else {
    console.log(err);
  }
});

export default app;
