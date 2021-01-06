import express from 'express';
import { searchAccommodations } from '../../controllers/accommodations';
import { searchLocations } from '../../controllers/locations';

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/search/locations:
 *  get:
 *    summary: A route that allows any user to perform search operations on locations.
 *    tags: [search]
 *    parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search keyword used to find the match location
 *    responses:
 *      "200":
 *        description: Returns the first 5 locations
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/searchLocations'
 *
 *      "404":
 *        description: Error 404 is thrown when no locations are found
 *
 * components:
 *    schemas:
 *      searchLocations:
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
 *                 LocationNamee:
 *                   type: string
 *                 country:
 *                   type: string
 *                 description:
 *                   type: string
 *                 link:
 *                   type: string
 * 
 */
router.get('/locations', searchLocations);

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