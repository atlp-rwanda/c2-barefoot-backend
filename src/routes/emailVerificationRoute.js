import express from 'express';
import verification from '../controllers/verification';

const router = express.Router();

/**
 * @swagger
 *
 * /verification/{token}:
 *    patch:
 *      summary: The email verification endpoint
 *      description: This endpoint is used when one is verifying their email.
 *      tags: [Email verification]
 *      parameters:
 *        - in: path
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Email is verified successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/verified'
 *        "400":
 *          description: The account is already verified
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/alreadyVerified'
 *        "404":
 *          description: The account does not exist
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/notFound'
 *
 * components:
 *    schemas:
 *      verified:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          Message:
 *            type: string
 *            description: Success message
 *        example:
 *          status: 200
 *          Message: Email has been verified
 *      alreadyVerified:
 *        type: object
 *        properties:
 *          Status:
 *            type: integer
 *            description: The HTTP status code
 *          Error:
 *            type: string
 *            description: The error message
 *        example:
 *          Status: 400
 *          Error: Account already verified
 *      notFound:
 *        type: object
 *        properties:
 *          Status:
 *            type: integer
 *            description: The HTTP status code
 *          Error:
 *            type: string
 *            description: The error message
 *        example:
 *          Status: 404
 *          Error: Account does not exist
 */

router.patch('/:token', verification);

export default router;
