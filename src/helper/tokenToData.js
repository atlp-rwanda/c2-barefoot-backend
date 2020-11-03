import jwt from 'jsonwebtoken'
import BadRequestError from '../errorHandler/badRequestError';
export async function getDataFromToken(req, res){
    if(req.headers && req.headers.authorization){
        const authorization = req.headers.authorization
        var decoded ='';
        // console.log(authorization)
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
        } catch (e) {
            console.log(".......ho.......")
            // throw new BadRequestError('session has expired',401)
            return res.status(401).json({message:'session has expired'});
        }
        // console.log(decoded)
    }
    return decoded
}