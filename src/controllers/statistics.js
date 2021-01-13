import models from '../models'
import sequelize from 'sequelize'
import topBookedccommodation from '../helper/topBookedAccomodation'
const getStatistics = async function (req, res, next) {
    const { Op } = require("sequelize");
    const activeUsers = await models.User.findAll({
        where: {manager_id: {[Op.not]: null } } })
  // get top visited Location
    const topVisitedLocation =  await models.Location.findAll({
                attributes: ['LocationName',[sequelize.fn('COUNT',sequelize.col('LocationName')),'visits']],
                group: ['LocationName'],
                order:[[sequelize.fn('COUNT', sequelize.col('LocationName')), 'DESC']],
                limit:3 })
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
        topBookedccommodation })}
module.exports = getStatistics

