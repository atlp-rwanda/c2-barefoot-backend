import express from 'express';
import swaggerUI from 'swagger-ui-express';
import routes from './src/routes/routes';
import swaggerDocument from './swagger.json';
import {} from 'dotenv/config'
import db from './src/config/connection.js'

const app = express();

// routes
app.use('/', routes);

// docuemntation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// db connection check
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log('Error: ' + err))

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});
