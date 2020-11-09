import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import db from './models/index';
import routes from './routes/index';
import ApplicationError from './utils/applicationError';
import swaggerConfigs from './config/swaggerDoc';

const app = express();
app.use(cors());
// app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;
// routes
// app.use('/', indexRoutes);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/', routes);
// app.use(cors());

// documentation route
const swaggerDocs = swaggerJsDoc(swaggerConfigs);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.all('*', (req, res, next) => {
  const err = new ApplicationError('Page Requested not found', 404);
  next(err);
});

// db connection check
const { sequelize } = db;
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ status, error: err.message, statck: err.stack });
});

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}  ...`);
}).on('error', function (err) {
  if(err.errno === 'EADDRINUSE') {
      console.log(`----- Port ${port} is busy, trying with port ${port + 1} -----`);
      listen(port + 1)
  } else {
      console.log(err);
  }
});

export default app;
