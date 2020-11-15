import { findTravelRequest } from '../services/travelRequestSearch';
import { getDataFromToken } from '../helper/tokenToData';

const getTravelRequest = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res);
  try {
    const id = req.params.requestId;
    const userid = decoded.id.toString();
    const offset = req.query.from;
    const limit = req.query.to;
    const pagination = { offset, limit };
    if (id) { // get a specific travel request
      var query = { userId: userid, travelId: id };
    } else { // get all travel request
      var query = { userId: userid };
    }
    findTravelRequest(res, query, pagination, next);
  } catch (err) {
    return res.status(401).json({ message: 'session has expired, please login' });
  }
};
export default getTravelRequest;
