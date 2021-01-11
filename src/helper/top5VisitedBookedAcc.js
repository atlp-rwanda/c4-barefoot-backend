import models from '../models'

const top5BookedAccommodation = async()=>{
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
    let sortedAccomodation = []
    for( const key in accommodationArr){
        sortedAccomodation.push([key,accommodationArr[key]])
    }
    sortedAccomodation.sort(function(a, b) {
        return b[1] - a[1];
    });
    return sortedAccomodation
} 
 export default top5BookedAccommodation
