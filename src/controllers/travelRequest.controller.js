import { isAccommodationExist } from '../helper/isAccomodationExist';
import { getDataFromToken } from '../helper/tokenToData';
import { createTravelRequest } from '../services/createTravelRequest';
import dbDataNotFoundError from '../utils/dbDataNotFoundError';
import travelRequestServices from '../services/directTravelRequest';
import ApplicationError from '../utils/applicationError';
import BadRequestError from '../utils/badRequestError';
import NotFoundRequestError from '../utils/notFoundRequestError';


export const travelRequest = async (req, res, next) => {
    const decoded = await getDataFromToken(req, res, next)
    if(decoded.manager_id){
        const request = {
            managerId:decoded.manager_id,
            userId:decoded.id,
            createdAt:new Date(),
            updatedAt: new Date(),
        }
        var counter = req.body.trip.length
        for(var records of req.body.trip){
            counter -=1
            const isAccommodationValid = await isAccommodationExist(records.accommodationId, next)
            if(!isAccommodationValid){
                throw new dbDataNotFoundError("Accommodation not found, try again")
            }else if(counter == 0){
                try{
                    createTravelRequest(req, res, request, next)
                }catch(err){
                    next(err)
                }
            }
        }
    }else if(decoded.managerId == undefined){
        console.log("session error")
    }else{
        res.json({message:"You need a Manager First."})
    }
    
}


export const cancel_travelRequest = async (req, res, next) =>{
    const { travelRequestId, action } = req.body;
    const decoded = await getDataFromToken(req, res, next)

    try{
        if(action === 'cancel'){
            const userId = decoded.id;
            const findTravelRequest = await travelRequestServices.findItById({travelId:travelRequestId});
            if(findTravelRequest){
                if(findTravelRequest.userId === userId){

                    const changes = 'canceled';
                    if(findTravelRequest.status === 'pending'){
                        const updateStatus = await travelRequestServices.updateStatus({travelId:travelRequestId, status:{status:changes}});
                        if(updateStatus){
                            return res.status(201).json({status: 201, message:`Travel request canceled successfully!`});
                        }else{
                            throw new ApplicationError("Failed to cancel this travel request, try again!",500);
                        }
                    }else{
                        throw new BadRequestError(`Can not cancel this travel request, because it is ${findTravelRequest.status}`,400);
                    }
                    
                }else{
                    throw new ApplicationError(`Not allowed to cancel this travel request`,403);
                }
            }else{
                throw new NotFoundRequestError("The travel request does not exist!",404);
            }
        }else{
            throw new BadRequestError("Can not perform this operation!",400);
        }
        
    }
    catch(error){
        next(error);
    }
    
}
