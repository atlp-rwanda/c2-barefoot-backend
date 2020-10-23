import db from '../models'
import { findTravelRequest } from '../helper/travelRequestSearch';

export const getDirectReport = (req, res) => {
    const managerId = req.body.mangerId
    if(managerId){
        db.Manager.findByPk(managerId)
            .then(managerInfo => {
                var query = {mangerID:managerInfo.mangerID}
                if(managerInfo.length != 0){
                    findTravelRequest(res, query)
                }
            })
    }
}