import models from '../models';
 
export const getOneBooking = (query)=>{
    const booked =  models.Booking.findOne({attributes:["id"],where:{ username: query.username, accommodationId: query.accommodationId} });
    return booked;
}
