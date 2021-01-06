import express from 'express';
import { searchAccommodations } from '../../controllers/accommodations';
import { searchLocations } from '../../controllers/locations';

const router = express.Router();

router.get('/locations', searchLocations);
router.get('/accommodations', searchAccommodations);

export default router;