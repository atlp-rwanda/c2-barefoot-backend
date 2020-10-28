import express from 'express'
import isLogedIn from "../helper/isLogedIn";
import travelRequest from "../controllers/travelRequest.controller";
import getTravelRequest from "../controllers/viewTravelRequest";
import { getDirectReport } from "../controllers/directReport.controller";

const router = express.Router()

// ----------------------- Make travelrequest --------------------
router.post('/requests/request', isLogedIn, travelRequest) //make a request

// ----------------------- View travelrequest --------------------
router.get('/requests/view', isLogedIn, getTravelRequest) // view all requests

// ----------------- View a particular travelrequest --------------------
router.get('/requests/view/:requestId', isLogedIn, getTravelRequest) //Get single request

// ----------------------- View direct report (Manager only) --------------------
router.get('/requests/direct-reports/:managerId', isLogedIn, getDirectReport) // view direct reports

export default router