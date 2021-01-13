//Get top booked accommodation
const getBookedAccomodation = async function () {
const topBookedccommodation =  await models.Booking.findAll({
    attributes: ['accommodationId',[sequelize.fn('COUNT',sequelize.col('accommodationId')),'bookings']],
    group: ['accommodationId'],
    order:[[sequelize.fn('COUNT', sequelize.col('accommodationId')), 'DESC']],
    limit:3 // You can change 3 to any number you want
})
}
module.exports = getBookedAccomodation