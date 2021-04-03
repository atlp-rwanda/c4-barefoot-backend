import db from '../models'
import pusher from '../config/pusher';
const createTravelRequest = async (req, res, request, next) => {

  db.TravelRequest.create(request)
    .then((tRequestData) => {
      try {
        const newNotificantion = {
          user_id: tRequestData.managerId,
          title: 'your user has made a Travel Request',
          message: "The user you are assigned to has made a travel request  ",
          travelId:tRequestData.travelId
          };
            
         db.Notification.create(newNotificantion).then(notification=>{
          pusher.trigger('bare-foot-normad', 'notification', notification);
          console.log(notification)
         });
        
        let counter = req.body.trip.length;
        for (const record of req.body.trip) {
          counter -= 1;
          record.travelId = tRequestData.travelId;
          if (counter == 0) {
            db.Trip.bulkCreate(req.body.trip, { hooks: true })
              .then((tripData) => {
                const allData = { ...tRequestData.get({ plain: true }), tripData };
                res.json({ message: ('Trip request sent successfully'), data: allData });
                next();
              })
              .catch((err) => { next(err); });
          }
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};

export default createTravelRequest;
