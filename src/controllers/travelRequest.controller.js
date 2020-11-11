import db from '../models'
import { getDataFromToken } from '../helper/tokenToData';

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
            // status:req.body.status,
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
                        record.travelId = tRequestData.travelId
                        if(counter == 0){
                            db.Trip.bulkCreate(req.body.trip, {hooks:true})
                            .then((tripData) => { 
                                /*awit.commit();*/ 
                                var allData = Object.assign({}, tRequestData.get({ plain: true }), {tripData})
                                res.json({message: "Trip request sent successfully", data: allData})})
                            .catch((err) => {/*await t.rollback();res.json(err);*/  next(err);  console.log(err.message);})
                        }
                    }
                }catch(err){
                    // res.status(400).json(err)
                    next(err)
                }
            })
            .catch(err => {
                // res.json(err)
                next(err)
            })
        }catch(err){
            // res.status(400).json(rr.message)
            next(err)
        }
    }else if(decoded.managerId == undefined){
        console.log("session error")
    }else{
        res.json({message:"You need a Manager First."})
    }
    
}

export default travelRequest