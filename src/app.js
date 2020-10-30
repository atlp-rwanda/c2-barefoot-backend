import express from 'express';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import swaggerJsDoc from 'swagger-jsdoc';
import db from './models/index';
import routes from './routes/index';
import ApplicationError from './utils/ApplicationError';
import swaggerConfigs from './swagger/index';

const app = express();

app.use(express.json());

// routes
routes(app);

// documentation route
const swaggerDocs = swaggerJsDoc(swaggerConfigs);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.all('*', (req, res, next) => {
  const err = new ApplicationError('Page Requested not found', 404);
  next(err);
});

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
