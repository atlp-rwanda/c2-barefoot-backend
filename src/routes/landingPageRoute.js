import express from 'express';
import welcome from '../controllers/welcome';

const router = express.Router();

/**
 * @swagger
 *
 * /:
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
 *
 * components:
 *    schemas:
 *      landing:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *          message:
 *            type: string
 *            description: Success message
 */

router.get('/', welcome);

export default router;
