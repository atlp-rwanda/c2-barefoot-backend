import express from 'express'
import isLogedIn from "../helper/isLogedIn";
import travelRequest from "../controllers/travelRequest.controller";
import getTravelRequest from "../controllers/viewTravelRequest";
import { getDirectReport } from "../controllers/directReport.controller";
import isSchemaValid from '../middlewares/tripRequestsValidation'

const router = express.Router()

// ----------------------- Make travelrequest --------------------
router.post('/requests/request', isLogedIn, isSchemaValid, travelRequest) //make a request

// ----------------------- View travelrequest --------------------
router.get('/requests', isLogedIn, getTravelRequest) // view all requests

// ----------------- View a particular travelrequest --------------------
router.get('/requests/:requestId', isLogedIn, getTravelRequest) //Get single request

// ----------------------- View direct report (Manager only) --------------------
router.get('/requests/direct-reports/:managerId', isLogedIn, getDirectReport) // view direct reports

export default router