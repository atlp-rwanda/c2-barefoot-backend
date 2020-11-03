import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import adminRoutes from './adminRoutes';


const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);
routes.use('/admin', adminRoutes);


export default routes;
