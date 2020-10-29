import express from 'express';
import signup from '../controllers/signup';
import signupValidation from '../middlewares/signupValidation';
import sendVerificationEmail from '../middlewares/sendEmail';

const router = express.Router();

// --------------------Signup Route ---------------

/**
 * @swagger
 *
 * /signup/:
 *    post:
 *      summary: A route that allows a user to sign up
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        "201":
 *          description: User has been created. Check email for verification
 *        "400":
 *          description: Account already exists
 *        "401":
 *          description: Verification Email not sent, try again
 *
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - first_name
 *          - last_name
 *          - email
 *          - password
 *          - address
 *          - language
 *          - profile_picture
 *        properties:
 *           first_name:
 *             type: string
 *           last_name:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           address:
 *             type: string
 *           language:
 *             type: string
 *           profile_picture:
 *             type: string
 *
 */

router.post('/', signupValidation, signup, sendVerificationEmail);

export default router;
