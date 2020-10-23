import express from 'express';
import swaggerUI from 'swagger-ui-express';
import 'dotenv/config';
import db from './config/connection.js';
import routes from './routes/routes';
import swaggerDocument from '../swagger.json';
import bodyParser from 'body-parser'

const app = express();

// parser
app.use(bodyParser.urlencoded())
// routes
app.use('/', routes);

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// db connection check
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
  console.log(process.env.NODE_ENV)
  
});

export default app;
