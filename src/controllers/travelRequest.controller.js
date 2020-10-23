import db from '../models'
import { dbErrorHandler } from '../middlewares/travelRequestValidation';
const travelRequest = (req, res) => {
    const trip = {
        originCity:req.body.location,
        destination:req.body.destination,
        reason:req.body.reason,
        tripDate: req.body.tripDate,
        returnDate: req.body.returnDate,
        accommodationID:req.body.accomodationId,
        userId:req.body.userId,
    }
    try{
        db.Trip.create(trip)
        .then(tripData => {
            // res.json(data); console.log(data); console.log(data.tripId); //console.log(data.Trip.dataValues.tripId);
            console.log(tripData)
            const request = {
        
                // traveID: "21234567",
                managerID: req.body.managerId,
                userID:req.body.userId,
                status:req.body.status,
                createdAt:new Date(),
                updatedAt: new Date(),
                tripId: tripData.tripId
            }
            try{
                db.TravelRequest.create(request)
                .then((tRequestData) => {res.json(tRequestData)})
                .catch(async (err) => {res.json(await dbErrorHandler(err)); console.log(err.message);})
                
            }catch(err){
                
                res.status(400).json(err.message)
            }
        })
        .catch(async err => {res.json(await dbErrorHandler(err))})
    }catch(err){
        res.status(400).json(err.message)
    }
    
}

export default travelRequest