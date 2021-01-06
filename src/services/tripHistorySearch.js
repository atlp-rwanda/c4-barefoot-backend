import { Sequelize } from 'sequelize';
import db from '../models';




const findTrip = async (res, query, location, offset, limit) => {
    try{
    const result = await db.Trip.findAndCountAll({
        limit, offset,
        where: { destination: location },
        include: [{
          model: db.TravelRequest,
          where: query
        }]
  
      })
      res.json({ result })
  
    } catch (err) {
      return res.status(401).json(err.message);
    }

};


export const displayNumberOfTrips = async (res, query) => {
    let resultSet1 = [];
    
        await db.TravelRequest.findAndCountAll({ where: query })
            .then((tRequestDataSet) => {
                if (tRequestDataSet.rows.length > 0) {
                    let counter = tRequestDataSet.rows.length;
                    tRequestDataSet.rows.forEach((tRequestData) => {
                        db.Trip.findAll({ where: { travelId: tRequestData.travelId } })
                            .then((tripData) => {
                                counter -= 1;
                                let result = tripData.map(a => a.destination);
                                resultSet1.push(result)
                                if (tripData != null) {
                                    if (counter === 0) {
                                        let countedTrips = resultSet1.reduce((r, c) => (r[c] = (r[c] || 0) + 1, r), {})
                                        res.json({ countedTrips });
                                    }
                                }
                            })
                    });
                } else {
                    res.status(404).json({ message: 'No trip Found' });
                }
            })
    
};




export default findTrip;
