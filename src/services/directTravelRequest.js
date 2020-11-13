import { approveTravelRequest } from '../controllers/directReport.controller';
import models from '../models';

exports.findItById = (query) =>{
    const travelReq= models.TravelRequest.findOne({where:{travelId: query.travelId}});

    return travelReq;
}

exports.updateStatus = (query) => {
    const change = models.TravelRequest.update({status: query.status}, {where:{travelId:query.travelId}});
    return change;
}