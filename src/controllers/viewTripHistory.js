
import getDataFromToken from '../helper/tokenToData';
import { displayTravelRequest, findTrip, findTripByTravelRequests } from '../services/tripHistorySearch.js'
import db from '../models';

export const getTripHistory = async (req, res, next) => {

  const decoded = await getDataFromToken(req, res, next);

  const userid = decoded.id.toString();
  const offset = req.query.page;
  const limit = req.query.limit;
  const location = req.params.location;
  let query = { userId: userid };
  let trips = await findTrip(query, location, limit, offset)

  res.json(trips)
};



export const getTotalOfTripsByLocation = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  try {
    const userid = decoded.id.toString();
    let query = { userId: userid };
    let resultSet1 = [];
    let travels = await displayTravelRequest(query);
    let counter = travels.rows.length;
    console.log(counter)
    if (counter > 0) {
      travels.rows.forEach((trData) => {
        console.log("_________", +counter)
        db.Trip.findAll({ where: { travelId: trData.travelId } })
          .then((tripData) => {
            console.log("_________", +counter)
            counter -= 1;
            //only selecting trips with their destination 
            let result = tripData.map(a => a.destination);
            resultSet1.push(result)
            if (counter === 0) {
              //grouping same destination trips before displaying them
              let countedTrips = resultSet1.reduce((r, c) => (r[c] = (r[c] || 0) + 1, r), {})
              res.json({ countedTrips });
            }
          })
      });
    } else {
      res.json("no trip was made");
    }


  } catch (err) {
    return res.status(401).json(err.message);
  }
};