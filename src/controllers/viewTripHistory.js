
import getDataFromToken from '../helper/tokenToData';
import db from '../models';

export const getTripHistory = async (req, res, next) => {
  
    const decoded = await getDataFromToken(req, res, next);
  
    const userid = decoded.id.toString();
    const offset = req.query.page;
    const limit = req.query.limit;
    const location = req.params.location;
    let query = { userId: userid };
     
    let result = await db.Trip.findAndCountAll({
      limit, offset,
      where: { destination: location },
      include: [{
          model: db.TravelRequest,
          where: query
      }]

  })
    res.json(result)  
};

export const getTotalOfTripsByLocation = async (req, res,next) => {
  const decoded = await getDataFromToken(req, res, next);
  try {
    const userid = decoded.id.toString();
    let query = { userId: userid };
    let resultSet1 = [];

    let travels = await db.TravelRequest.findAndCountAll({ where: query })
    if (travels.rows.length > 0) {
      let counter = travels.rows.length;
      //looping in all travel requests to find the trips made by that travel request id
        travels.rows.forEach((trData) => {
            db.Trip.findAll({ where: { travelId: trData.travelId } })
                .then((tripData) => {
                  counter -= 1;
                  //only selecting trips with destination
                    let result = tripData.map(a => a.destination);
                    resultSet1.push(result)
                  if (counter === 0) {
                      //grouping same datas
                        let countedTrips = resultSet1.reduce((r, c) => (r[c] = (r[c] || 0) + 1, r), {})
                        res.json({ countedTrips });
                    }
                })
        });
    } else {
        res.status(404).json({ message: 'No trip Found' });
    }
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

