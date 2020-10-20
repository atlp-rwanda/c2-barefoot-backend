import {findUserByEmail} from '../services/userServices';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();

export const  resetPassword = async(req,res)=>{
    const {email} = req.body;
    const userFound = await findUserByEmail(email);
    if(!userFound) return res.status(404).json({ status: 404, error: 'User not found' });
    if(!userFound.verified) return res.status(401).json({ status: 401, error: 'Account not verified'});
    const token = jwt.sign({email:userFound.email}, process.env.APP_KEY);
    // send Email
    return res.status(200).json({ status: 200, message: 'Request sent successfully', data: token});
}
