import models from '../models'

const limit = 5

const getBookedAccomodation = async function (req,res) {
    const accommodations = await models.Booking.findAll({
        attributes: ['accommodationId','id']
    })
    let accommodationArr = {}
    accommodations.forEach(accommodation => {
        const id = accommodation.accommodationId
        if(accommodationArr.hasOwnProperty(id)){
        accommodationArr[id] = accommodationArr[id] + 1
        } else{
            accommodationArr[id] = 1
        }
    });
    let sortedAccomodatio = []
    
    for( const key in accommodationArr){
        sortedAccomodatio.push([key,accommodationArr[key]])
    }
    
    sortedAccomodatio.sort(function(a, b) {
        return b[1] - a[1];
    });
    
return sortedAccomodatio
}
module.exports = getBookedAccomodation