import express from 'express';
import {
  createAccommodation,
  getAccommodations,
  getOneAccommodation,
  updateAccommodation,
  deleteAccommodation
} from '../../controllers/accommodations';

const router = express.Router();
router.get('/', getAccommodations);
router.get('/:id', getOneAccommodation);
router.patch('/:id', updateAccommodation);
router.delete('/:id', deleteAccommodation);
router.post('/createAccommodation', createAccommodation);

export default router;
