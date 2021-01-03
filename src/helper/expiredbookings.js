import models from '../models';
import {Op} from 'sequelize';


const expiredBookings = async () => {
    try {
      const booking = await models.Booking.findAll({
          where: {
          To: {
            [Op.lte]: new Date()
          },
          checkedout: false
        }
      });
      if (!booking[0]) {
        throw new notFound('You do not have any bookings');
      }
      booking.forEach(async singleBooking => {
        // 
        await models.Accommodation.increment(
          {
            numberOfRooms: +1
          }, {
            where: {
            id: singleBooking.accommodationId
          }
        })
        // 
      });
      await models.Booking.update(
        {
          checkedout: true
        }, {
          where: {
          To: {
            [Op.lte]: new Date()
          },
          checkedout: false
        }
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  export default expiredBookings;