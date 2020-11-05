import jwt from 'jsonwebtoken'
import BadRequestError from '../errorHandler/badRequestError';
export async function getDataFromToken(req, res, next){
    if(req.headers && req.headers.authorization){
        const authorization = req.headers.authorization
        var decoded ='';
        // console.log(authorization)
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
        } catch (e) {
            // throw new BadRequestError('session has expired',401)
            // return res.status(401).json({message:'session has expired'});
            next(e)
        }
        // console.log(decoded)
    }
    return decoded
}