import express from 'express';
import welcome from '../controllers/welcome';
import dummyData from '../controllers/dummyUser.controller'
import travelRequest from '../controllers/travelRequest.controller';
import getTravelRequest from '../controllers/viewTravelRequest';
import travelRequestValidation from '../middlewares/travelRequestValidation';
import { getDirectReport } from '../controllers/directReport.controller';
import signup from '../controllers/signup';
import verification from '../controllers/verification';
import signupValidation from '../middlewares/signupValidation';
import loginValidation from '../middlewares/loginValidation';
import logedIn from '../isLogedIn';
import login from '../controllers/login';
import logout from '../controllers/logout';

const router = express.Router();

// ------------------Welcome Page-----------------
// router.post('/user/add', dummyData)
router.post('/requests/request', travelRequest) //make a request
router.get('/requests/view', getTravelRequest) // view all requests
router.get('/requests/view/:requestId', getTravelRequest) //Get single request
router.get('/requests/direct-reports/:managerId', getDirectReport) // view direct reports
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
