import express from 'express';
import { createLocation, getLocations } from '../../controllers/locations';

const router = express.Router();
router.get('/', getLocations);
router.post('/createLocation', createLocation);

export default router;
