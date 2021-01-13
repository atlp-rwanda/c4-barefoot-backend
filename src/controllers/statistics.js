import models from '../models'
const getStatistics = async function (req, res, next) {
    const { Op } = require("sequelize");
    const activeUsers = await models.User.findAll({
        where: { manager_id: { [Op.not]: null } } })
  // get top visited Location
    const topVisitedLocation =  await models.Location.findAll({
                attributes: ['LocationName',[sequelize.fn('COUNT',sequelize.col('LocationName')),'visits']],
                group: ['LocationName'],
                order:[[sequelize.fn('COUNT', sequelize.col('LocationName')), 'DESC']],
                limit:3 // You can change 3 to any number you want
             })
            //Get top booked accommodation
            const topBookedccommodationId =  await models.Booking.findAll({
                attributes: ['accommodationId',[sequelize.fn('COUNT',sequelize.col('accommodationId')),'bookings']],
                group: ['accommodationId'],
                order:[[sequelize.fn('COUNT', sequelize.col('accommodationId')), 'DESC']],
                limit:3 // You can change 3 to any number you want
            })
        //Get the number of  Accomodation and Locations
    const numberOfAccommodation = await models.Accommodation.findAndCountAll({})
    const numberOfLocation = await models.Location.findAndCountAll({})
    res.status(200).send({
        title: 'STATISTICS',
        numberOfActiveUsers: activeUsers.length,
        users: activeUsers,
        numberOfAccommodation: numberOfAccommodation.count,
        numberOfLocation,
        topVisitedLocation,
        topBookedccommodationId 
    }) }
module.exports = getStatistics

