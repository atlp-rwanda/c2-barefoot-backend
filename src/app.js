import express from 'express';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import swaggerDocument from '../swagger.json';
import db from './config/connection';

const app = express();

app.use(bodyParser.json());

// routes
app.use('/', routes);

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = process.env.PORT || 3000;

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});

export default app;
