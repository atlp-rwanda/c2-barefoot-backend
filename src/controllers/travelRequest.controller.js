import db from '../models'
import {DbErrorHandler as TR } from '../middlewares/travelRequestValidation';
import { getDataFromToken } from '../helper/tokenToData';

const travelRequest = async (req, res) => {
    const decoded = await getDataFromToken(req, res)
    try{
        const userid = decoded.id.toString()
    }catch(err){
        const userid=null
    }
    
    if(decoded.managerId){
        const request = {
            managerId: req.body.managerId,
            userId:userid,
            status:req.body.status,
            createdAt:new Date(),
            updatedAt: new Date(),
        }
    
        /*const t = db.sequelize.transaction()*/
        try{
            db.TravelRequest.create(request)
            .then(tRequestData => {
                try{
                    var counter = req.body.trip.length
                    for(var record of req.body.trip){
                        counter -=1
                        record.joiner = tRequestData.travelId
                        if(counter == 0){
                            db.Trip.bulkCreate(req.body.trip, {hooks:true})
                            .then((tripData) => { /*awit.commit();*/ res.json({message: "Trip request sent successfully"})})
                            .catch(async (err) => {/*await t.rollback();*/ res.json(await TR.getTravelRequestError(err)); console.log(err.message);})
                        }
                    }
                }catch(err){
                    res.status(400).json(TR.getTravelRequestError(err))
                }
            })
            .catch(async err => {
                res.json(await TR.getTravelRequestError(err))
            })
        }catch(err){
            res.status(400).json(TR.getTravelRequestError(err.message))
        }
    }else{
        res.json({message:"You need a Manager First."})
    }
    
}

export default travelRequest