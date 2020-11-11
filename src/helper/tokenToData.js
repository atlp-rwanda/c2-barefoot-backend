import jwt from 'jsonwebtoken'
import isUserExist from '../services/findUser';
export async function getDataFromToken(req, res, next){
    if(req.headers && req.headers.authorization){
        const authorization = req.headers.authorization
        var decoded ='';
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
            const user = isUserExist(decoded.email)
            return user
        } catch (e) {
            return res.status(401).json({message:'session has expired, please login'});
        }
    }
    return decoded
}