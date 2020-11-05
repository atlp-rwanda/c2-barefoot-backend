import express from 'express'
import isLogedIn from "../helper/isLogedIn";
import travelRequest from "../controllers/travelRequest.controller";
import getTravelRequest from "../controllers/viewTravelRequest";
import { getDirectReport } from "../controllers/directReport.controller";
import isSchemaValid from '../middlewares/tripRequestsValidation'

const router = express.Router()

// ----------------------- Make travelrequest --------------------

/**
 * @swagger
 * 
 * /api/v1/requests/request:
 *    post:
 *      summary: A route used to send trip requests
 *      description: This route helps to send trip requests. Either one-way or mult-city travel request.
 *      tags: [Trip Request]
 *      responses:
 *        "200":
 *          description: The trip requests page worked properly
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/travelRequestSucces'
 * 
 * components:
 *    schemas:
 *      travelRequestSucces:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          message:
 *            type: string
 *            description: Success message
 *            example: trip request sent successfully
 *          data:
 *            type: object
 *            description: Object returned
 *            properties:
 *              {originCity: Kigali,
 *              destination: Cairo,
 *              tripDate: 11/12/2020,
 *              returnDate: 11/12/2021,
 *              accommodationId: 1234567,
 *              reason: tripping}
 *            example: 
 *              {"originCity":Kigali, "destination":Cairo, "tripDate":11/12/2020, "returnDate":11/12/2021, "accommodationId":1234567, "reason":tripping}
 */
router.post('/requests/request', isLogedIn, isSchemaValid, travelRequest) //make a request

// ----------------------- View travelrequest --------------------
/**
 * @swagger
 * 
 * /api/v1/requests:
 *    get:
 *      summary: A route used to get trip requests
 *      description: This route helps to get trip requests made by a particular user. Either one-way or mult-city travel request.
 *      tags: [Trip Request]
 *      responses:
 *        "200":
 *          description: The trip requests page returned them successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/travelRequestList'
 * 
 * components:
 *    schemas:
 *      travelRequestList:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: object
 *            description: Object returned
 *            properties:
 *              {originCity: Kigali,
 *              destination: Cairo,
 *              tripDate: 11/12/2020,
 *              returnDate: 11/12/2021,
 *              accommodationId: 1234567,
 *              reason: tripping}
 *            example: 
 *              [{"originCity":Kigali, "destination":Cairo, "tripDate":11/12/2020, "returnDate":11/12/2021, "accommodationId":1234567, "reason":tripping}]
 */
router.get('/requests', isLogedIn, getTravelRequest) // view all requests

// ----------------- View a particular travelrequest --------------------
router.get('/requests/:requestId', isLogedIn, getTravelRequest) //Get single request

// ----------------------- View direct report (Manager only) --------------------
/**
 * @swagger
 * 
 * /api/v1/requests/direct-reports:
 *    get:
 *      summary: A route used to get direct reports to the manager
 *      description: This route helps to get requests to be managed by a particular manager.
 *      tags: [Trip Request, Direct reports]
 *      responses:
 *        "200":
 *          description: The direct reports page returned successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/directReports'
 * 
 * components:
 *    schemas:
 *      directReports:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: array
 *            properties:
 *              {originCity: Kigali,
 *              destination: Cairo,
 *              tripDate: 11/12/2020,
 *              returnDate: 11/12/2021,
 *              accommodationId: 1234567,
 *              reason: tripping}
 *            example: 
 *              [{"originCity":Kigali, "destination":Cairo, "tripDate":11/12/2020, "returnDate":11/12/2021, "accommodationId":1234567, "reason":tripping}]
 */

router.get('/requests/direct-reports/:managerId', isLogedIn, getDirectReport) // view direct reports

export default router

/**
 * 
 * schemas:
 *      travelReaquest:
 *        type: object
 *        required:
 *          - originCity
 *          - destination
 *          - tripDate
 *          - accommodationId
 *          - reason
 *        properties:
 *           originCity:
 *             type: string
 *           destination:
 *             type: string
 *           tripDate:
 *             type: Date
 *           returnDate:
 *             type: Date
 *           accommodationId:
 *             type: integer
 *           reason:
 *             type: string
 */