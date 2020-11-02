import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import welcome from '../controllers/userController/welcome';
import loginValidation from '../middlewares/loginValidation';
import logedIn from '../helper/isLogedIn';
import login from '../controllers/userController/login';
import logout from '../controllers/userController/logout';
import refreshToken from '../controllers/userController/refreshToken';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);

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
// router.post('/signup', signupValidation, signup);

// ------------------Email verification Route --------------

// router.get('/verification/:token', verification);

// /**
// @swagger
// /refresh-token/:
//   post:
//     summary: This is for regenarating new access token to access protected route
//     tags: Refresh-token
//     description: regenerate a new access token
//     responses:
//       "200":
//         message: New token generated
//       content:
//         application/json:
//           schema:
//             $ref: '#/components/schemas/refreshtoken'
// components:
//   schemas:
//     refreshtoken:
//       properties:
//         userToken:
//           type: string
//           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJeyJpZCI6MjQsImZpcnN0X25hbWUiOiJBbWkgZGVzIGpl'

// */
router.post('/refresh-token', refreshToken);

// ---------------users login ------------------------------

// /**
// @swagger
//  /login:
//   post:
//   tags:
//     - Users
//   name: Login
//   summary: Logs in a user
//   consummes:
//     - application/json
//   parameters:
//     - name: body
//       in: body
//       schema:
//         user:
//           type: object
//       required:
//         - email
//         - password
//           properties:
//             email:
//               type: string
//             password:
//               type: string
//   responses:
//     "200":
//       description: Login succesful. token: hfhasfbcsdjhfb45348242xkjfhckjfchjfhfakldf
//     "400"
//       description: for validation error, incorrect password
//     "404":
//       description: if you used none registered email which not found in database
//     "403":
//       description: when you don't verify you email, please verify your email first

// */
router.post('/login', loginValidation, login);

// --------------- Logout ----------------------------------
// /**
// *
// * @swagger
// * /logout/:
// *   post:
// *    summary: this route allow user to logout after login
// *    tags: [Logout]
// *    description: User logout
// *    procedures:
// *      - application/json
// *    prameters:
// *      - name: accessToken
// *         description: this token used to access protected route
// *         in:headers
// *         required :true
// *         type: string
// *     responses:
// *     "200":
// *       description: successful logout
// *     "400":
// *       description: you are not loged in
// */
router.post('/logout', logedIn, logout);

// --------------- refresh token ---------------------------

export default router;
