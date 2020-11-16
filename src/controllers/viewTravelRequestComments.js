import { getDataFromToken } from "../helper/tokenToData";
import { findTravelRequestComments } from "../services/findTravelRequestComments";

const getTravelRequestComments = async (req, res, next) => {
    const decoded = await getDataFromToken(req, res, next)
    try{
        const id = req.params.commentId
        const userid = decoded.id.toString()
        const offset = req.query.from
        const limit = req.query.to
        var pagination = {offset, limit}
        if(id){     // get a specific travel request
            var query = {userId:userid, commentId:id}
        }else{      // get all travel request
            var query = {userId:userid}
        }
        findTravelRequestComments(res, query, next, pagination) 
    }catch(err){
        next(err)
    }
}
export default getTravelRequestComments