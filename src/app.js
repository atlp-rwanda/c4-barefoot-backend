import express from 'express';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import db from './models/index';
import routes from './routes/index';
import ApplicationError from './utils/applicationError';
import swaggerConfigs from './config/swaggerDoc';

const app = express();
app.use(express.json());

app.use(cors());

// routes
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/', routes);

// documentation route
const swaggerDocs = swaggerJsDoc(swaggerConfigs);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// catch all 404 errors
app.all('*', (req, res, next) => {
  const err = new ApplicationError('Page Requested not found', 404);
  next(err);
});

// catch all 404 errors
app.use(async (res) => {
  res.status(404).json({ message: 'Unable to find the requested resource' });
});

// db connection check
const port = process.env.PORT || 3000;

const { sequelize } = db;
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ status: statusCode, error: err.message, stack: err.stack });
  next(err);
});

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port} ...`);
});

app.use((err, req, res) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ Status: statusCode, Error: err.message });
});

export default app;
