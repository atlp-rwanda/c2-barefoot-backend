import express from 'express';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import db from './models/index';
import routes from './routes/routes';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());

// routes
app.use('/', routes);

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

export default app;
