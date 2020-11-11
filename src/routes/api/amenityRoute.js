import express from 'express';
import {
  createAmenity,
  updateAmenity
} from '../../controllers/amenity';

const router = express.Router();
router.patch('/:id', updateAmenity);
router.post('/createAmenity', createAmenity);

export default router;
