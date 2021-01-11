import models from '../models'
import UserServices from '../services/user.service';

const getStatistics = async function (req, res, next) {
   
    const { Op } = require("sequelize");
    const activeUsers = await models.User.findAll({
        where: {
          manager_id: {
            [Op.not]: null
          }
        }
        })
    const numberOfAccommodation = await models.Accommodation.findAndCountAll({})
    const numberOfLocation = await models.Location.findAndCountAll({})
    const locations = await models.Location.findAll({
        attributes: ['LocationName']
    })
    let locationArr = {}
    locations.forEach(location => {
        const name = location.LocationName
        if(locationArr.hasOwnProperty(name)){
            locationArr[name] = locationArr[name] + 1
        } else{
            locationArr[name] = 1
        }
    });
    let sortedLocations = []
    
    for( const key in locationArr){
        sortedLocations.push([key,locationArr[key]])
    }

    sortedLocations.sort(function(a, b) {
        return b[1] - a[1];
    });
  
const accommodations = await models.Booking.findAll({
    attributes: ['accommodationId','id']
})
let accommodationArr = {}
accommodations.forEach(accommodation => {
    const name = accommodation.accommodationId
    if(accommodationArr.hasOwnProperty(name)){
    accommodationArr[name] = accommodationArr[name] + 1
    } else{
        accommodationArr[name] = 1
    }
});
let sortedAccomodatio = []
for( const key in accommodationArr){
    sortedAccomodatio.push([key,accommodationArr[key]])
}
sortedAccomodatio.sort(function(a, b) {
    return b[1] - a[1];
});

    res.status(200).send({
        title: 'STATISTICS',
        numberOfActiveUsers: activeUsers.length,
        users: activeUsers,
        numberOfAccommodation: numberOfAccommodation.count,
        numberOfLocation,
        mostVisitedLocations: sortedLocations.slice(0, 5),
        top5VisitedBookedAccommodations: sortedAccomodatio.slice(0,5)
    
    })
}

module.exports = getStatistics

