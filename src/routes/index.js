import express from 'express';
import userRoutes from './userRoutes';
import tRequestRoutes from './travelRequestRoutes'

const routes = express.Router();

routes.use('/', userRoutes);
routes.use('/', tRequestRoutes)

export default routes;
