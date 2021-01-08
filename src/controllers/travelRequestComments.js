import BadRequestError from '../utils/Errors/badRequestError';
import getDataFromToken from '../helper/tokenToData';
import { createTravelComment } from '../services/createTravelRequestComment';

const TravelRequestComment = async (req, res, next) => {
  try {
    const decoded = await getDataFromToken(req, res, next);
    const request_id = req.params.travelId;
    const { comment } = req.body;
    if (request_id) {
      if (comment) {
        const commentBody = {
          userId: decoded.id,
          travelId: request_id,
          comment
        };
        try {
          createTravelComment(req, res, commentBody, next);
        } catch (err) {
          next(err);
        }
      } else {
        throw new BadRequestError(res.__('You must provide comment'));
      }
    } else {
      throw new BadRequestError(res.__('You must provide request id'));
    }
  } catch (err) {
    next(err);
  }
};

export default TravelRequestComment;
