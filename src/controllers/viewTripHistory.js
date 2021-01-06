
import getDataFromToken from '../helper/tokenToData';
import findTrip, { displayNumberOfTrips } from '../services/tripHistorySearch';


export const getTripHistory = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  
    const userid = decoded.id.toString();
    const offset = req.query.page;
    const limit = req.query.limit;
    const location = req.params.location;
    let query = { userId: userid };
    findTrip(res, query, location, offset, limit);
    
};

export const getTotalOfTripsByLocation = async (req, res,next) => {
  const decoded = await getDataFromToken(req, res, next);
  try {
    const userid = decoded.id.toString();
    let query = { userId: userid };

    displayNumberOfTrips(res, query);
  } catch (err) {
    return res.status(401).json(err.message);
  }
};
