import express from 'express';
import verification from '../controllers/verification';

const router = express.Router();

router.patch('/:token', verification);

export default router;
