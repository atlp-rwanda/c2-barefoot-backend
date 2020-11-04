// import express from 'express';
// import userRoutes from './userRoutes';

// const routes = express.Router();

// routes.use('/', userRoutes);

// export default routes;

import express from 'express';
import landingPage from './api/landingPageRoute';
import userRoute from './api/user';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/', landingPage);

export default routes;
