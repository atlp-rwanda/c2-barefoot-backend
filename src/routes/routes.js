import express from 'express';
import welcome from '../controllers/welcome';
import {resetPassword, verifyResetPassword} from '../controllers/resetPassword';
import {validateResetEmail}  from '../validations/userValidation';

const router = express.Router();

// ------------------Welcome Page-----------------

router.get('/', welcome);
router.post('/resetPassword/request',validateResetEmail, resetPassword);
// router.patch('/ResetPassword',resetLink)
router.post('/resetPassword/verify', verifyResetPassword);
export default router;
