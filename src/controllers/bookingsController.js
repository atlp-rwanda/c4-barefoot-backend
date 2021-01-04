import models from '../models';
import getUserData from '../helper/tokenToData';
import notFound from '../utils/Errors/notFoundRequestError';
import {Op} from 'sequelize';

const showBookings = async (req, res, next) => {
  try {
    const user = await getUserData(req, res);
    const booking = await models.Booking.findAll({ where: { username: user.username } });
    if (!booking[0]) {
      throw new notFound(res.__('You do not have any bookings'));
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};
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


export {
  showBookings,
  expiredBookings
};
 