import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import locationsRoute from './api/locationsRoute';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/location', locationsRoute);

export default routes;
