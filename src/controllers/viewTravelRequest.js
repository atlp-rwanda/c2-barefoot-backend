import { findTravelRequest } from "../helper/travelRequestSearch";

const getTravelRequest = (req, res) => {
    const id = req.params.requestId
    const userid = req.body.userId
    console.log("++----++" + id)
    
    if(id){     // get a specific travel request
        var query = {userID:userid, travelID:id}
    }else{      // get all travel request (for a specific user)
        var query = {userID:userid}
    }
    findTravelRequest(res, query)
}
export default getTravelRequest