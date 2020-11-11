import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import adminRoutes from './api/adminRoutes';
import permit from '../controllers/admin/accessControl';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/admin', permit(["all"]), adminRoutes);


export default routes;
