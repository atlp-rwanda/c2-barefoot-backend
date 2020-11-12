import express from 'express';
import {
  createAccommodation,
  getAccommodations,
  getOneAccommodation,
  updateAccommodation,
  deleteAccommodation
} from '../../controllers/accommodations';
import permit from '../../middlewares/accessControl';

const router = express.Router();
router.get('/', permit(['view accommodations']), getAccommodations);
router.get('/:id', permit(['view accommodations']), getOneAccommodation);
router.patch('/:id', permit(['update accommodations']), updateAccommodation);
router.delete('/:id', permit(['delete accommodations']), deleteAccommodation);
router.post('/createAccommodation', permit(['create accommodations']), createAccommodation);

export default router;
