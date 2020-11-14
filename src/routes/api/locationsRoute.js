import express from 'express';
import {
  createLocation, getLocations, getOneLocation, updateLocation, deleteLocation
} from '../../controllers/locations';
import permit from '../../middlewares/accessControl';

const router = express.Router();
router.get('/', permit(['view locations']), getLocations);
router.get('/:id', permit(['view locations']), getOneLocation);
router.patch('/:id', permit(['update locations']), updateLocation);
router.delete('/:id', permit(['delete locations']), deleteLocation);
router.post('/', permit(['create locations']), createLocation);

export default router;
