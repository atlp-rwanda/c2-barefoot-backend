import express from 'express';
import welcome from '../controllers/userController/welcome';
import signup from '../controllers/userController/signup';
import verification from '../controllers/userController/verification';
import signupValidation from '../middlewares/signupValidation';
import loginValidation from '../middlewares/loginValidation';
import logedIn from '../helper/isLogedIn';
import login from '../controllers/userController/login';
import logout from '../controllers/userController/logout';
import refreshToken from '../controllers/userController/refreshToken';
import travelRequest from '../controllers/travelRequest.controller';
import getTravelRequest from '../controllers/viewTravelRequest';
import { getDirectReport } from '../controllers/directReport.controller';
import isLogedIn from '../helper/isLogedIn';

const router = express.Router();

// ------------------Welcome Page-----------------
// router.post('/user/add', dummyData)
router.post('/requests/request', isLogedIn, travelRequest) //make a request
router.get('/requests/view', isLogedIn, getTravelRequest) // view all requests
router.get('/requests/view/:requestId', isLogedIn, getTravelRequest) //Get single request
router.get('/requests/direct-reports/:managerId', isLogedIn, getDirectReport) // view direct reports
router.get('/', welcome);

// --------------------Signup Route ---------------

router.post('/signup', signupValidation, signup);

// ------------------Email verification Route --------------

router.get('/verification/:token', verification);

// ---------------users login ------------------------------
router.post('/login', loginValidation, login);

// --------------- Logout ----------------------------------
router.post('/logout', logedIn, logout);
// --------------- refresh token ---------------------------
router.post('/refresh-token', refreshToken);

export default router;
