import express from 'express';
import signup from '../controllers/signup';
import signupValidation from '../middlewares/signupValidation';
import sendVerificationEmail from '../middlewares/sendEmail';

const router = express.Router();

// --------------------Signup Route ---------------

router.post('/', signupValidation, signup, sendVerificationEmail);

export default router;
