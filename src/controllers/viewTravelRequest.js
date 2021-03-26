import findTravelRequest from '../services/travelRequestSearch';
import getDataFromToken from '../helper/tokenToData';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';
import travelRequestServices from '../services/directTravelRequest';
import ApplicationError from '../utils/Errors/applicationError';

export const getTravelRequest = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  console.log(decoded.id);
  try {
    const id = req.params.requestId;
    const userid = decoded.id.toString();
    const offset = req.query.from;
    const limit = req.query.to;
    const pagination = { offset, limit };
    let query = '';
    if (id) { // get a specific travel request
      query = { userId: userid, travelId: id };
    } else { // get all travel request
      query = { userId: decoded.id };
    }
    findTravelRequest(res, query, next, pagination);
  } catch (err) {
    return res.status(401).json({ message: 'session has expired, please login' });
  }
};

export const editTravelRequest = async (req, res, next) => {
  const { tripId, updates } = req.body;
  const id = req.params.requestId;

  const decoded = await getDataFromToken(req, res, next);

  try {
    const userId = decoded.id;
    const findTravelRequests = await travelRequestServices.findItById({ travelId: id });
    if (findTravelRequests) {
      if (findTravelRequests.userId === userId) {
        if (findTravelRequests.status === 'pending' || findTravelRequests.status === 'rejected' || findTravelRequests.status === 'canceled') {
          const findTrip = await travelRequestServices.findTrip({ travelId: id, tripId });
          if (findTrip) {
            const updateTrip = await travelRequestServices.updateTrip({ tripId, changes: updates });
            if (updateTrip) {
              const updateStatus = await travelRequestServices.updateStatus({ status: { status: 'pending' }, travelId: id });
              if (updateStatus) {
                return res.status(201).json({ status: 201, message: 'Trip updated successfully!'});
              }
              throw new ApplicationError(('Failed to update the status, try again!'), 500);
            } else {
              throw new ApplicationError(('Failed to update this trip, try again!'), 500);
            }
          } else {
            throw new NotFoundRequestError(('Trip id not found'), 404);
          }
        } else {
          throw new ApplicationError((`Failed to update this trip, it is already ${findTravelRequests.status}`), 500);
        }
      } else {
        throw new ApplicationError(('Failed update this trip'), 403);
      }
    } else {
      throw new NotFoundRequestError(('The travel request does not exist!'), 404);
    }
  } catch (error) {
    next(error);
  }
};
