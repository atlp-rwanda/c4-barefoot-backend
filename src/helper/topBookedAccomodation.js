import models from '../models'
import sequelize from 'sequelize'

const limit = 5

//Get top booked accommodation
const getBookedAccomodation = async function (req,res) {
const topBookedccommodation =  await models.Booking.findAll({
    attributes: ['accommodationId',[sequelize.fn('COUNT',sequelize.col('accommodationId')),'bookings']],
    group: ['accommodationId'],
    order:[[sequelize.fn('COUNT', sequelize.col('accommodationId')), 'DESC']],
    limit: limit
})
return topBookedccommodation
}
module.exports = getBookedAccomodation