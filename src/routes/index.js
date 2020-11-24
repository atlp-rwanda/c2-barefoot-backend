import express from 'express';
import landingPage from './api/landingPageRoute';
import userProfile from './api/userprofile';
import userRoute from './api/user';
import travelRequestroutes from './api/travelRequestRoutes';
import directreportsRoutes from './api/directReports';
import tRequestsCommentsRoutes from './api/travelCommentsRoutes';
import managerRouter from './api/assignUserToManager';
import adminRoutes from './api/adminRoutes';
import permit from '../middlewares/accessControl';
import locationsRoute from './api/locationsRoute';
import accommodationRoute from './api/accommodationsRoute';
import amenityRoute from './api/amenityRoute';
import setUserLocale from '../middlewares/setLocale';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/requests/', setUserLocale, travelRequestroutes);
routes.use('/directReports', setUserLocale, directreportsRoutes);
routes.use('/comment', setUserLocale, tRequestsCommentsRoutes);

routes.use('/assignUserstoManager', setUserLocale, managerRouter);
routes.use('/', setUserLocale, landingPage);
routes.use('/locations', setUserLocale, locationsRoute);
routes.use('/accommodations', setUserLocale, accommodationRoute);
routes.use('/amenities', setUserLocale, amenityRoute);
routes.use('/admin', permit(['all']), setUserLocale, adminRoutes);

routes.use('/profile', setUserLocale, userProfile);

export default routes;
