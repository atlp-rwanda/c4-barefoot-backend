import express from 'express';
import swaggerUI from 'swagger-ui-express';
import routes from './routes/routes';
import swaggerDocument from '../swagger.json';

const app = express();

// routes
app.use('/', routes);

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});

export default app;
