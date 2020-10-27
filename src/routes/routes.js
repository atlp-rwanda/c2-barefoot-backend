import express from 'express';
import welcome from '../controllers/welcome';
import signup from '../controllers/signup';
import verification from '../controllers/verification';
import signupValidation from '../middlewares/signupValidation';
import loginValidation from '../middlewares/loginValidation';
import logedIn from '../isLogedIn';
import login from '../controllers/login';
import logout from '../controllers/logout';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);

// --------------------Signup Route ---------------

router.post('/signup', signupValidation, signup);

// ------------------Email verification Route --------------

router.get('/verification/:token', verification);

// ---------------users login ------------------------------
router.post('/login', loginValidation, login);

// --------------- Logout ----------------------------------
router.get('/logout', logedIn, logout);

export default router;
