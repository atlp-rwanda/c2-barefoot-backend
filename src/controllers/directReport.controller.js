import db from '../models'
import { findTravelRequest } from '../helper/travelRequestSearch';

export const getDirectReport = (req, res) => {
    const managerId = req.params.managerId
    console.log(managerId)
    if(managerId){
        db.Manager.findByPk(managerId)
            .then(managerInfo => {
                var query = {mangerID:managerInfo.mangerId}
                if(managerInfo.length != 0){
                    findTravelRequest(res, query)
                }
            })
            .catch(err => {
                res.json({message:"Manager Not Found", err})
            })
    }
}