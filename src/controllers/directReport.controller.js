import db from '../models'
import { findTravelRequest } from '../services/travelRequestSearch';
import { getDataFromToken } from '../helper/tokenToData';
import roles from '../utils/roles';
import { decode } from 'jsonwebtoken';

export const getDirectReport = async (req, res, next) => {
    const decoded = await getDataFromToken(req, res, next)
    try{
        const managerId = decoded.id.toString()
        const role = decoded.user_role_id
        const roleType = role == roles.MANAGER
        const offset = req.query.from
        const limit = req.query.to
        const travelId = req.params.travelId
        var pagination = {offset, limit}
        if(managerId && roleType){
            if(travelId){
                var query = {managerId:managerId, travelId:travelId}
                findTravelRequest(res, query, next, pagination)
            }else{
                var query = {managerId:managerId}
                findTravelRequest(res, query, next, pagination)
            }
        }else{
            res.status(401).json({message:"you are not an approved manager"})
        }
    }catch(err){
        console.log(err.message)
    }
}