import isUserExist from '../services/findUser';
import { verifyToken } from '../utils/auth';
export async function getDataFromToken(req, res, next){
    if(req.headers && req.headers.authorization){
        const authorization = req.headers.authorization
        var decoded ='';
        try {
            user = verifyToken(authorization)
            const user = isUserExist(decoded.email)
            return user
        } catch (e) {
            return res.status(401).json({message:'session has expired, please login'});
        }
    }
    return decoded
}