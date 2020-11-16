import { findTravelRequest } from '../services/travelRequestSearch';
import getDataFromToken from '../helper/tokenToData';
import roles from '../utils/roles';

const getDirectReport = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  try {
    const managerId = decoded.id.toString();
    const role = decoded.user_role_id;
    const roleType = role === roles.MANAGER;
    const offset = req.query.from;
    const limit = req.query.to;
    const { travelId } = req.params;
    const pagination = { offset, limit };
    if (managerId && roleType) {
      if (travelId) {
        const query = { managerId, travelId };
        findTravelRequest(res, query, next, pagination);
      } else {
        const query = { managerId };
        findTravelRequest(res, query, next, pagination);
      }
    } else {
      res.status(401).json({ message: 'you are not an approved manager' });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default getDirectReport;
