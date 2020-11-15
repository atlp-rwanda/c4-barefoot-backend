import { isAccommodationExist } from '../helper/isAccomodationExist';
import { getDataFromToken } from '../helper/tokenToData';
import { createTravelRequest } from '../services/createTravelRequest';
import dbDataNotFoundError from '../utils/dbDataNotFoundError';
import BadRequestError from '../utils/badRequestError';

const travelRequest = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  try {
    if (decoded.manager_id) {
      const request = {
        managerId: decoded.manager_id,
        userId: decoded.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      let counter = req.body.trip.length;
      for (const records of req.body.trip) {
        counter -= 1;
        const isAccommodationValid = await isAccommodationExist(records.accommodationId, next);
        if (!isAccommodationValid) {
          throw new dbDataNotFoundError('Accommodation not found, try again');
        } else if (counter == 0) {
          createTravelRequest(req, res, request, next);
        }
      }
    } else {
      throw new BadRequestError('You need a Manager First.', 400); // added error handling
    }
  } catch (err) {
    next(err);
  }
};

export default travelRequest;
