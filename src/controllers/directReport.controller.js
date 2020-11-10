import db from '../models'
import { findTravelRequest } from '../helper/travelRequestSearch';
import { getDataFromToken } from '../helper/tokenToData';

export const getDirectReport = async (req, res, next) => {
    const decoded = await getDataFromToken(req, res, next)
    try{
        const managerId = decoded.id.toString()
        const role = decoded.user_role_id
        const roleType = role == 2
        const offset = req.query.from
        const limit = req.query.to
        var pagination = {offset, limit}
        // console.log(role)
        // console.log(managerId, roleType)
        if(managerId && roleType){
            var query = {managerId:managerId}
            findTravelRequest(res, query, pagination)
        }else{
            res.status(401).json({message:"you are not an approved manager"})
        }
    }catch(err){
        next(err)
        // console.log(err.message)
        
    }
}