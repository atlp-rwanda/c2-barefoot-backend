import express from 'express';
import welcome from '../../controllers/welcome';
import { getAllLocale } from '../../controllers/manageLocale';

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1:
 *    get:
 *      summary: A route that shows the landing page
 *      description: This is the first page you meet when starting the app.
 *      tags: [Landing Page]
 *      responses:
 *        "200":
 *          description: The landing page has loaded
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/landing'
 * components:
 *    schemas:
 *      landing:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          message:
 *            type: string
 *            description: Success message
 *            example: Welcome to Barefoot Nomad
 */

router.get('/', welcome);
router.get('/locales', getAllLocale);
export default router;
