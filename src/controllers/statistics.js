import models from '../models'
import sequelize from 'sequelize'
import topBookedccommodation from '../helper/topBookedAccomodation'
import topVisitedLocation from '../helper/topVisitedLocation'
const getStatistics = async function (req, res, next) {
    const { Op } = require("sequelize");
    const activeUsers = await models.User.findAll({
        where: {manager_id: {[Op.not]: null } } })
        //Get the number of  Accomodation and Locations
    const numberOfAccommodation = await models.Accommodation.findAndCountAll({})
    const numberOfLocation = await models.Location.findAndCountAll({})
    const SortedBookedAccomodation = await topBookedccommodation(req,res)
    const sortedVisitedLocation = await topVisitedLocation(req,res)
    res.status(200).send({
        title: 'STATISTICS',
        numberOfActiveUsers: activeUsers.length,
        users: activeUsers,
        numberOfAccommodation: numberOfAccommodation.count,
        numberOfLocation,
        sortedVisitedLocation,
       SortedBookedAccomodation
    })}
export default  getStatistics

