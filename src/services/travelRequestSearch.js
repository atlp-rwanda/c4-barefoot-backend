import db from '../models';
import userService from './user.service';
import accommodations from './accommodations';
import {findTravelUserInfo, findTripAccomodations} from './travelAuxData';

const findTravelRequest = async (res, query, next, pagination) => {
  const resultSet = [];
  db.TravelRequest.findAndCountAll({ where: query, ...pagination })
    .then((tRequestDataSet) => {
      if (tRequestDataSet.rows.length > 0) {
        let counter = tRequestDataSet.rows.length;
        tRequestDataSet.rows.forEach((tRequestData) => {
          db.Trip.findAll({ where: { travelId: tRequestData.travelId } })
            .then(async (tripData) => {
              counter -= 1;
              if (tripData != null) {
                const allData = {

                  ...tRequestData.get({ plain: true }),
                  Trip: tripData,
                };
                resultSet.push(allData);
                if (counter === 0) {
                  const newData=await Promise.all(resultSet.map( async (travel) => {
                    try{
                      const userInfo = await findTravelUserInfo(travel); 
                      const accommodationInfo= await findTripAccomodations(travel)
                      
                      return {
                        travelRequestInfo: travel,
                        userInfo: userInfo,
                        accommodationInfo: accommodationInfo
                      }
                    }
                    catch(err){
                      next(err)
                    }
                   
                  }))
                   res.json(newData); 
                }
              }
            })
            .catch((err) => {
              next(err);
            });
        });
      } else {
        res.status(404).json({ message: ('Travel request(s) Not Found') });
      }
    })
    .catch((err) => {
      next(err);
    });
};

export default findTravelRequest;
