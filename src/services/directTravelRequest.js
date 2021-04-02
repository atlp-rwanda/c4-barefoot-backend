import models from '../models';

exports.findItById = (query) =>{
    const travelReq= models.TravelRequest.findOne({where:{travelId: query.travelId}});

    return travelReq;
}

exports.updateStatus = (query) => {
    const change = models.TravelRequest.update(query.status, {where:{travelId:query.travelId}});
    return change;
}

exports.findTrip = (query) => {
    const search = models.Trip.findOne({where:{tripId: query.tripId, travelId: query.travelId}});
    return search;
}
exports.updateTrip = (query) => {
    const updates = models.Trip.update(query.changes,{where:{tripId: query.tripId}});
    return updates;
}