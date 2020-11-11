import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import locationsRoute from './api/locationsRoute';
import accommodationRoute from './api/accommodationsRoute';
import amenityRoute from './api/amenityRoute';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/location', locationsRoute);
routes.use('/accommodation', accommodationRoute);
routes.use('/amenity', amenityRoute);

export default routes;
