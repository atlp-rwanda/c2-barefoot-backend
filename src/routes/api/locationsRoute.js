import express from 'express';
import locationsController from '../../controllers/locations';

const router = express.Router();

router.post('/createLocation', locationsController.createLocation);

export default router;
