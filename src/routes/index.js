import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import locationsRoute from './api/locationsRoute';
import accommodationRoute from './api/accommodationsRoute';
import amenityRoute from './api/amenityRoute';
import adminRoutes from './api/adminRoutes';
import permit from '../middlewares/accessControl';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/locations', locationsRoute);
routes.use('/accommodations', accommodationRoute);
routes.use('/amenities', amenityRoute);
routes.use('/admin', permit(['all']), adminRoutes);

export default routes;
