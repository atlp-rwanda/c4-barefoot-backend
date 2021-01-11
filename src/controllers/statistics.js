import models from '../models'
import top5VisitedLocation from '../helper/top5visitedloc'
import top5BookedAccommodation from '../helper/top5VisitedBookedAcc'

const getStatistics = async function (req, res, next) {
    const { Op } = require("sequelize");
    const activeUsers = await models.User.findAll({
        where: {
          manager_id: {
            [Op.not]: null
          }
        }
        })
        //Get the number of  Accomodation
    const numberOfAccommodation = await models.Accommodation.findAndCountAll({})
    //Get the number of Locations
    const numberOfLocation = await models.Location.findAndCountAll({})
    // Get top 5 visited Location 
    let sortedLocations = await top5VisitedLocation()
    // Get top 5 visited, Booked Accommodation
    let sortedAccomodation =await  top5BookedAccommodation()
    res.status(200).send({
        title: 'STATISTICS',
        numberOfActiveUsers: activeUsers.length,
        users: activeUsers,
        numberOfAccommodation: numberOfAccommodation.count,
        numberOfLocation,
        mostVisitedLocations: sortedLocations.slice(0, 5),
        top5VisitedBookedAccommodations: sortedAccomodation.slice(0,5)
    })
}
module.exports = getStatistics

