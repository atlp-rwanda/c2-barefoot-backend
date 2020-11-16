import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';
import managerRouter from './api/assignUserToManager';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/assignUserstoManager', managerRouter);
routes.use('/', landingPage);

export default routes;
