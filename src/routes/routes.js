import express from 'express';
import welcome from '../controllers/welcome';

const router = express.Router();

// ------------------Welcome Page-----------------

router.post('/', welcome);

export default router;
