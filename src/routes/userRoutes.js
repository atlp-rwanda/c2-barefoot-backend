import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import welcome from '../controllers/userController/welcome';
import signup from '../controllers/userController/signup';
import verification from '../controllers/userController/verification';
import signupValidation from '../middlewares/signupValidation';
import loginValidation from '../middlewares/loginValidation';
import logedIn from '../helper/isLogedIn';
import login from '../controllers/userController/login';
import logout from '../controllers/userController/logout';
import refreshToken from '../controllers/userController/refreshToken';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);

// --------------------Signup Route ---------------

router.post('/signup', signupValidation, signup);

// ------------------Email verification Route --------------

router.get('/verification/:token', verification);

// ---------------users login ------------------------------

/**
*
* @swagger
* /login/:
*    post:
*      summary: this route allow user to login,
*      tags:[Login]
*      requestBody:
*        requered: true,
*        content:application/json:
*          schema:
*            $ref:'#component/schemas/user'
*      responses:
*        "200":
*          description: Login succesful. token: hfhasfbcsdjhfb45348242xkjfhckjfchjfhfakldf
*        "400"
*          description: for validation error, incorrect password
*        "404":
*          description: if you used none registered email which not found in database
*        "403":
*          description: when you don't verify you email, please verify your email first
*
* components:
*   shemas:
*     user:
*       type: object
*       required:
*         - email
*         - password
*       properties:
*         email:
*           type:string
*         password:
*           type:string
*
*/
router.post('/login', loginValidation, login);

// --------------- Logout ----------------------------------
/**
*
* @swagger
* /logout/:
*   post:
*    summary: this route allow user to logout after login
*    tags: [Logout]
*    description: User logout
*    procedures:
*      - application/json
*    prameters:
*      - name: accessToken
         description: this token used to access protected route
         in:headers
         required :true
         type: string
     responses:
     "200":
       description: successful logout
     "400":
       description: you are not loged in
*/
router.post('/logout', logedIn, logout);
// --------------- refresh token ---------------------------
router.post('/refresh-token', refreshToken);

export default router;
