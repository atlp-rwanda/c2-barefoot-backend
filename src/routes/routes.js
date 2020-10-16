import express from 'express';
import welcome from '../controllers/welcome';
import signup from '../controllers/signup';
import signupValidation from '../middlewares/signupValidation';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);

// --------------------Signup Route ---------------

router.post('/signup', signupValidation, signup);

export default router;
