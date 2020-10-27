import { findUserByEmail, updateUserPassword } from "../services/userServices";
import models from "../models";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { config } from "dotenv";
import { validateResetEmail } from "../validations/userValidation";
import sendResetPasswordLink from "../controllers/sendEmail";
config();

export const resetPassword = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const userFound = await models.user.findOne({ where: { email: email } });
  if (!userFound)
    return res.status(404).json({ status: 404, error: "User not found" });
  if (!userFound.verified)
    return res.status(401).json({ status: 401, error: "Account not verified" });
  const token = jwt.sign({ email: userFound.email }, process.env.TOKEN_SECRET, {expiresIn: 300});
  sendResetPasswordLink(userFound.email);
  return res
    .status(200)
    .json({ status: 200, message: "Request sent successfully", data: token });
};

 

export const verifyResetPassword = async(req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;
  
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(decodedToken)

  if (!decodedToken) return res.status(403).json({ status: 403, error: 'INvalid TOken' });
  if (password === confirmPassword) return res.status(400).json({ status: 400, error: 'Passwords do not match' });
  const hashedPassword = bcrypt.hashSync(password, 10);
  const updatedPassword = await updateUserPassword(decodedToken.user, hashedPassword);
  return res.status(200).json({ status: 200, message: 'Password reset successful', data: updatedPassword})
}