import models from '../models';
import getUserData from '../helper/tokenToData';
import notFound from '../utils/Errors/notFoundRequestError';

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


export default showBookings ;

 