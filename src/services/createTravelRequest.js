import db from '../models'

export function createTravelRequest(req, res, request, next) {
    db.TravelRequest.create(request)
        .then(tRequestData => {
            try{
                var counter = req.body.trip.length
                for(var record of req.body.trip){
                    counter -=1
                    record.travelId = tRequestData.travelId
                    if(counter == 0){
                        db.Trip.bulkCreate(req.body.trip, {hooks:true})
                        .then((tripData) => { 
                            var allData = Object.assign({}, tRequestData.get({ plain: true }), {tripData})
                            res.json({message: "Trip request sent successfully", data: allData})})
                        .catch((err) => {next(err);  console.log(err.message);})
                    }
                }
            }catch(err){
                next(err)
            }
        })
        .catch(err => {
            next(err)
        })
}