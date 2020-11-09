import express from 'express';
import {
  createLocation, getLocations, getOneLocation, updateLocation, deleteLocation
} from '../../controllers/locations';

const router = express.Router();
router.get('/', getLocations);
router.get('/:id', getOneLocation);
router.patch('/:id', updateLocation);
router.delete('/:id', deleteLocation);
router.post('/createLocation', createLocation);

export default router;
