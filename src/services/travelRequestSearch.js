import db from '../models'

export function findTravelRequest(res,query, next, pagination){
    const resultSet = [];
    db.TravelRequest.findAndCountAll({where:query, ...pagination})
        .then(tRequestDataSet => {
            if(tRequestDataSet.rows.length > 0){
                var counter = tRequestDataSet.rows.length
                tRequestDataSet.rows.forEach((tRequestData) => {
                    db.Trip.findAll({where:{travelId:tRequestData.travelId}})
                        .then(tripData => {
                            counter -=1
                            if(tripData != null){
                                const allData = Object.assign(
                                    {},
                                    tRequestData.get({ plain: true }), 
                                    {Trip:tripData},
                                    )
                                resultSet.push(allData)
                                if(counter == 0){res.json(resultSet);}
                            }
                        })
                        .catch(err => {
                            next(err)
                            console.log(err)
                        })
                });
            }else{
                    res.status(404).json({message:"Travel request(s) Not Found"})
                }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
}