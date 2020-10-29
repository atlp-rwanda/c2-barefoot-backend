import express from 'express';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
// import db from './config/connection';
import db from './models/index';
import indexRoutes from './routes/index';
import swaggerDocument from '../swagger.json';
import ApplicationError from './utils/applicationError';

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/', indexRoutes);

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// db connection check
const { sequelize } = db;
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

const port = process.env.PORT || 3000;

// Not found error handle
app.use((req, res, next) => {
  const err = new ApplicationError(`This URL ${req.path} not found`, 404);
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status: statusCode, error: err.message, stack: err.stack });
});

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
  console.log(process.env.NODE_ENV);
});

export default app;
