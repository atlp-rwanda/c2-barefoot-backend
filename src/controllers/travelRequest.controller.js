import db from '../models'
import {DbErrorHandler as TR } from '../middlewares/travelRequestValidation';

// console.log("......"+t)
const travelRequest = (req, res) => {
    const request = {
        
        // traveID: "21234567",
        managerId: req.body.managerId,
        userId:req.body.userId,
        status:req.body.status,
        createdAt:new Date(),
        updatedAt: new Date(),
        // tripId: tripData.tripId
    }

    /*const t = db.sequelize.transaction()*/
    try{
        db.TravelRequest.create(request)
        .then(tRequestData => {
            // res.json(data); console.log(data); console.log(data.tripId); //console.log(data.Trip.dataValues.tripId);
            // console.log(tRequestData.travelId)
            // console.log(JSON.stringify(tRequestData))
            // const trip = [{
            //     originCity:req.body.trip.location,
            //     destination:req.body.destination,
            //     reason:req.body.reason,
            //     tripDate: req.body.tripDate,
            //     returnDate: req.body.returnDate,
            //     accommodationID:req.body.accommodationId,
            //     userId:req.body.userId,
            //     joiner:tRequestData.travelId
            // }]
            try{
                var counter = req.body.trip.length
                for(var record of req.body.trip){
                    counter -=1
                    record.joiner = tRequestData.travelId
                    if(counter == 0){
                        db.Trip.bulkCreate(req.body.trip, {hooks:true})
                        .then((tripData) => { /*awit.commit();*/ res.json(tripData)})
                        .catch(async (err) => {/*await t.rollback();*/ res.json(await TR.getTravelRequestError(err)); console.log(err.message);})
                    }
                }
            }catch(err){
                res.status(400).json(TR.getTravelRequestError(err))
            }
        })
        .catch(async err => {res.json(await TR.getTravelRequestError(err));
        console.log(err)})
    }catch(err){
        res.status(400).json(TR.getTravelRequestError(err.message))
    }
}

export default travelRequest