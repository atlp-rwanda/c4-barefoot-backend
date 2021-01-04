import db from '../models'
export function createTravelComment(req, res, query, next) {
    try{
        db.TravelComments.create(query)
        .then(tCommentData => {
            res.status(200).json({message:res.__("comment created successfully"), tCommentData})
        })
        .catch(err => {
            switch(err.parent.code){
                case '23503':
                    res.status(400).json({message:res.__("Travel request with this id does not exist.")})
                    break
                default:
                    next(err)
            }
            
        })
    }catch(err){
        next(err)
    }
}