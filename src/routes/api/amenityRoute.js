import express from 'express';
import {
  createAmenity,
  updateAmenity
} from '../../controllers/amenity';
import permit from '../../middlewares/accessControl';

const router = express.Router();
router.patch('/:id', permit(['update accommodations']), updateAmenity);
router.post('/createAmenity', createAmenity);

export default router;
