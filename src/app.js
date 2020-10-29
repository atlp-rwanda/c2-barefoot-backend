import express from 'express';
import 'dotenv/config';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import db from './models/index';
import routes from './routes/index';
import swaggerConfigs from './swgger/index';

const app = express();

app.use(express.json());

// routes
routes(app);

// docuemntation route
const swaggerDocs = swaggerJsDoc(swaggerConfigs);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// db connection check
const port = process.env.PORT || 3000;

const { sequelize } = db;
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status);
    res.json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});

// process.on('unhandledRejection', (err) => {
//   console.error('Got an Unhandled Promise Rejection', err);
//   process.exit(1); // mandatory (as per the Node docs)
// });

export default app;
