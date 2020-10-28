import express from 'express';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import db from './models/index';
import routes from './routes/index';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());

// routes
routes(app);

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// db connection check
const port = process.env.PORT || 3000;

const { sequelize } = db;
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

app.use((err, req, res, next) => {
  res.status(err.status);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});

process.on('unhandledRejection', (err) => {
  console.error('Got an Unhandled Promise Rejection', err);
  process.exit(1); // mandatory (as per the Node docs)
});

export default app;
