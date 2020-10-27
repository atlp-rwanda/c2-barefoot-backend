import express from 'express';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
// import db from './config/connection';
import db from './models/index';
import indexRoutes from './routes/index';
import swaggerDocument from '../swagger.json';
import bodyParser from 'body-parser'

const app = express();

// parser
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
//app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1', indexRoutes);

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
  res.status(404);
  res.json({ status: 404, error: `This URL ${req.path} not found` });
});

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
  console.log(process.env.NODE_ENV);
});

export default app;
