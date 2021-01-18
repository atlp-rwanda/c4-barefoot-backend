import db from '../models';



export const findTrip = async (query, location, limit, offset) => {
    let result = await db.Trip.findAndCountAll({
        limit, offset,
        where: { destination: location },
        include: [{
            model: db.TravelRequest,
            where: query
        }]

    })
    return result;
}

export const displayTravelRequest = async (query) => {
    let travels = await db.TravelRequest.findAndCountAll({ where: query })

    return travels

}



