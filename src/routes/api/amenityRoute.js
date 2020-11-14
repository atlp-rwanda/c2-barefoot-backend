import express from 'express';
import updateAmenity from '../../controllers/amenity';
import permit from '../../middlewares/accessControl';

const router = express.Router();
router.patch('/:id', permit(['update accommodations']), updateAmenity);

export default router;
