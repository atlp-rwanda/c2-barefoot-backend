import express from 'express';
import welcome from '../controllers/welcome';
import dummyData from '../controllers/dummyUser.controller'
import travelRequest from '../controllers/travelRequest.controller';
import getTravelRequest from '../controllers/viewTravelRequest';
import travelRequestValidation from '../middlewares/travelRequestValidation';
import { getDirectReport } from '../controllers/directReport.controller';

const router = express.Router();

// ------------------Welcome Page-----------------
// router.post('/user/add', dummyData)
router.post('/requests/request', travelRequest) //make a request
router.get('/requests/view', getTravelRequest) // view all requests
router.get('/requests/view/:requestId', getTravelRequest) //Get single request
router.get('/requests/direct-reports', getDirectReport) // view direct reports
router.get('/', welcome);

export default router;
