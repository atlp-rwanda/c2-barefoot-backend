import express from 'express';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import db from './config/connection';
import routes from './routes/routes';
import adminRoutes from './routes/adminRoutes';
import swaggerDocument from '../swagger.json';
import applicationError from './errorHandling/applicationError';

const app = express();
app.use(express.json());

app.use(express.json());

// routes
app.use('/', routes);
app.use('/admin', adminRoutes);

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// db connection check
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

const port = process.env.PORT || 3000;

app.use((req, res, next)=>{
  const err = new applicationError(`This URL ${req.path} is not found`, 404);
  next(err);
});

app.use((err, req, res, next) =>{
  const statusCode = err.status || 500;
  res.status(statusCode).json({ status : statusCode, error: err.message, stack: err.stack });
});

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
  console.log(process.env.NODE_ENV);
});

export default app;
