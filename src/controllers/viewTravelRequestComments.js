import getDataFromToken from "../helper/tokenToData";
import { findTravelRequestComments } from "../services/findTravelRequestComments";

const getTravelRequestComments = async (req, res, next) => {
    const decoded = await getDataFromToken(req, res, next)
    try{
        const request_id = req.params.requestId
        const comment_id = req.params.commentId
        const userid = decoded.id.toString()
        const offset = req.query.from
        const limit = req.query.to
        var pagination = {offset, limit}
        if(comment_id){
            var query = {travelId:request_id, commentId:comment_id}
        }
        else if(request_id){     // get a specific travel request
            var query = {travelId:request_id}
        }else{      // get all travel request
            var query = {userId:userid}
        }
        findTravelRequestComments(res, query, next, pagination) 
    }catch(err){
        next(err)
    }
}
export default getTravelRequestComments