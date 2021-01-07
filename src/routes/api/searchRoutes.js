import express from 'express';
import { searchAccommodations } from '../../controllers/accommodations';
import { getAllLocations } from '../../controllers/locations';

const router = express.Router();


/**
 * @swagger
 *
 * /api/v1/search/locations/all:
 *  get:
 *    summary: A route that allows the user to retrieve all locations.
 *    tags: [search]
 *    responses:
 *      "200":
 *        description: Returns the first 2 locations
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/allLocations'
 *
 *      "404":
 *        description: Error 404 is thrown when no locations are available
 *
 *  components:
 *    schemas:
 *      allLocations:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *            example: 200
 *          locations:
 *            type: object
 *            description: An object containing locations retrieved from the database
 *            properties:
 *              count:
 *                type: integer
 *                description: The number of locations available in the database
 *                example: 1
 *              rows:
 *                type: array
 *                description: An array of retrieved locations. Each item is a location.
 *                items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: A unique UUID v4 of the user
 *                        example: 952595eb-b193-4391-9196-6840f7ad293d
 *                      LocationName:
 *                        type: string
 *                        description: The name of the location
 *                        example: Kigali
 *                      country:
 *                        type: string
 *                        description: The country where the location is
 *                        example: Rwanda
 *                      description:
 *                        type: string
 *                        description: A short description about the location
 *                        example: The land of a thousand hills
 *                      link:
 *                        type: string
 *                        description: A link to a video or wiki with more info about the location
 *                        example: https://en.wikipedia.org/wiki/Kigali
 *
 *
 */
router.get('/locations/all', getAllLocations);


/**
 * @swagger
 *
 * /api/v1/search/accommodations:
 *  get:
 *    summary: A route that allows any user to perform search operations on accommodations based on locations.
 *    tags: [search]
 *    parameters:
 *       - in: query
 *         name: fromLocation
 *         schema:
 *           type: string
 *         description: The search keyword used to find accommodations from a specific location
 *       - in: query
 *         name: city
 *         schema:
 *            type: string
 *         description: The city keyword of the location
 *    responses:
 *      "200":
 *        description: Returns the first 10 accommodations
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/searchAccommodations'
 *
 *      "404":
 *        description: Error 404 is thrown when no accommodations are found
 *
 * components:
 *    schemas:
 *      searchAccommodations:
 *        type: object
 *        properties:
 *          counts:
 *            type: integer
 *          rows:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                 id:
 *                   type: string
 *                 country:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 streetAddress:
 *                   type: string
 *                 locationID:
 *                   type: string
 *                 propertyType:
 *                   type: string
 *                 numberOfRooms:
 *                   type: integer
 *                 typeOfBed:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 photos:
 *                   type: string
 *          page:
 *            type: string
 *          limit:
 *            type: integer
 * 
 */
router.get('/accommodations', searchAccommodations);

export default router;