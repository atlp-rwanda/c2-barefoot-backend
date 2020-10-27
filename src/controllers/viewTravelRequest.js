import { findTravelRequest } from "../helper/travelRequestSearch";

const getTravelRequest = (req, res) => {
    const id = req.params.requestId
    const userid = req.body.userId
    console.log("++----++" + id)
    
    if(id){     // get a specific travel request
        var query = {userId:userid, travelId:id}
    }else{      // get all travel request (for a specific user)
        var query = {userId:userid}
    }
    findTravelRequest(res, query)
}
export default getTravelRequest