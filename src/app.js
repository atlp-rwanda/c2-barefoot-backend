import express from 'express';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import db from './models/index';
import routes from './routes/index';
import swaggerDocument from '../swagger.json';
import ApplicationError from './utils/ApplicationError';

const app = express();

app.use(express.json());

// routes
routes(app);

app.all('*', (req, res, next) => {
  const err = new ApplicationError('Page Requested not found', 404);
  next(err);
});

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// db connection check
const port = process.env.PORT || 3000;

const { sequelize } = db;
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ Status: statusCode, Error: err.message });
});

export default app;
