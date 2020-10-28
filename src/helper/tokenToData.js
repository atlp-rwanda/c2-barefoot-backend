import jwt from 'jsonwebtoken'
export async function getDataFromToken(req, res){
    if(req.headers && req.headers.authorization){
        const authorization = req.headers.authorization
        var decoded ='';
        // console.log(authorization)
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
        } catch (e) {
            return res.status(401).json({message:'session has expired'});
        }
        // console.log(decoded)
    }
    return decoded
}