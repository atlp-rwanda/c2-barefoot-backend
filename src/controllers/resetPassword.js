import { findUserByEmail } from "../services/userServices";
import models from '../models';
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import {validateResetEmail} from '../validations/userValidation';
import sendResetPasswordLink from "../controllers/sendEmail"; 
config();

  const resetPassword =async(req, res) => {
      const email = req.body.email;
      const schema  = validateResetEmail()
      const {err}= schema.validate(req.body.email);
      console.log({err});
   if(err){
       return res.status(400).json({err : err.details[0].message});  
   }
  const userFound = await models.user.findOne({where:{email:email}})
  if (!userFound)
    return res.status(404).json({ status: 404, error: "User not found" });
  if (!userFound.verified)
  return res.status(401).json({ status: 401, error: "Account not verified" });
  const token = jwt.sign({ email: userFound.email }, process.env.TOKEN_SECRET);
  sendResetPasswordLink(userFound.email)

  return res
  .status(200)
    .json({ status: 200, message: "Request sent successfully", data: token });
}

export default resetPassword