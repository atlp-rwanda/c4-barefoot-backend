import db from '../models'
import dbDataNotFoundError from '../utils/dbDataNotFoundError';

export function findTravelRequestComments(res,query, next, pagination){
    try{
        db.TravelComments.findAndCountAll({where:query, ...pagination})
        .then(tRequestComments => {
            console.log(JSON.stringify(tRequestComments))
            if(tRequestComments.rows.length > 0){
                res.status(200).json(tRequestComments.rows)
            }else{
                throw new dbDataNotFoundError("No comments found")
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }catch(err){
        next(err)
    }
}