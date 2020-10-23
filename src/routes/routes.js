import express from 'express';
import welcome from '../controllers/welcome';
import signup from '../controllers/signup';
import verification from '../controllers/verification';
import signupValidation from '../middlewares/signupValidation';
import sendVerificationEmail from '../middlewares/sendEmail';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);

// --------------------Signup Route ---------------

router.post('/signup', signupValidation, signup, sendVerificationEmail);

// ------------------Email verification Route --------------

router.get('/verification/:token', verification);

export default router;
