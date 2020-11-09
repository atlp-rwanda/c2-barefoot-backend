import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import userServices from '../services/user.services';
import sendResetPasswordLink from './sendEmail';
import UsersError from '../utils/userserror';

config();

export const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userFound = await userServices.getUserByEmail(email);
    if (!userFound) return res.status(404).json({ status: 404, error: 'User not found' });
    if (!userFound.verified) return res.status(401).json({ status: 401, error: 'Account not verified' });
    const token = jwt.sign({ email: userFound.email }, process.env.TOKEN_SECRET, {
      expiresIn: 300,
    });
    sendResetPasswordLink(userFound.email);
    res.status(200).json({ status: 200, message: 'Request sent successfully', data: token });
  } catch (err) { next(err); }
};

export const verifyResetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password, confirmPassword } = req.body;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedToken) return res.status(403).json({ status: 403, error: 'Invalid Token' });
    if (password !== confirmPassword) throw new UsersError('Password do not match', 400);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const updatedPassword = userServices.updateUserWithEmail(
      decodedToken.user,
      hashedPassword
    );
    res.status(200).json({ status: 200, message: 'Password reset successful' });
  } catch (err) { next(err); }
};
