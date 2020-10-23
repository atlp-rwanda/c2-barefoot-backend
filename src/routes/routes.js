import express from 'express';
import welcome from '../controllers/welcome';
import resetPassword from '../controllers/resetPassword';
import {validateResetEmail } from '../validations/userValidation';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);
router.post('/resetPassword/request',validateResetEmail, resetPassword);

export default router;
