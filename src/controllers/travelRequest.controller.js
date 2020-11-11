import { getDataFromToken } from '../helper/tokenToData';
import { createTravelRequest } from '../services/createTravelRequest';

const travelRequest = async (req, res, next) => {
    const decoded = await getDataFromToken(req, res, next)
    try{
        const userid = JSON.stringify(decoded.id)
    }catch(err){
        const userid=null
    }
    if(decoded.manager_id){
        const request = {
            managerId:decoded.manager_id,
            userId:decoded.id,
            createdAt:new Date(),
            updatedAt: new Date(),
        }
        try{
            createTravelRequest(req, res, request, next)
        }catch(err){
            next(err)
        }
    }else if(decoded.managerId == undefined){
        console.log("session error")
    }else{
        res.json({message:"You need a Manager First."})
    }
    
}

export default travelRequest