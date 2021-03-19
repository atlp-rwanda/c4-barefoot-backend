import BadRequestError from '../utils/Errors/badRequestError';
import getDataFromToken from '../helper/tokenToData';
import { createTravelComment } from '../services/createTravelRequestComment';
import findUserById from '../services/findUserById';
import models from '../models';
import pusher from '../config/pusher';
import sendEmail from '../helper/sendEmail';
import { decode } from 'jsonwebtoken';
const TravelRequestComment = async (req, res, next) => {
  let reciver;
  try {
    const decoded = await getDataFromToken(req, res, next);
    const userId = decoded.id;
    const request_id = req.params.travelId;
    const travel= await models.TravelRequest.findOne({ where: { travelId:request_id } })
    if(travel) {
      const { comment } = req.body;
      if (comment) {
          const commentBody = {
            userId: decoded.id,
            travelId: request_id,
            comment
          };
        if(decoded.id ===travel.userId){
          reciver = await findUserById(travel.managerId)
        }else if(decoded.id===travel.managerId){
          reciver = await findUserById(travel.userId)
        }
        const mailOptions = {
          email: reciver.email,
          subject: 'Your travel request',
          name:reciver.username,
          body: `<p></br>Hope this email finds you well. Thank you for sending your request at</br>Barefoot nomad ,${decoded.username} commented on the travel request you created or you manage.</p><p>Kindly regard</p>`
        };
        await sendEmail(mailOptions);
        try {
            createTravelComment(req, res, commentBody, next);
              //in-app notification and email notification
              const newNotificantion = {
                userId: decoded.id,
                title: 'your Travel Request',
                message: `Your travel request was ${req.body.action}ed!`
                  };
                  const notification = await models.Notification.create(newNotificantion);
               pusher.trigger('bare-foot-normad', 'notification', notification);
              res.status(201).json({ status: 201, message: 'Operation performed successfully!' });
              next();
          } catch (err) {
            next(err);
          }
        } else {
          throw new BadRequestError(('You must provide comment'));
        }
      } else {
        throw new BadRequestError(('this travel request do not exit'));
      }
    } catch (err) {
    next(err);
  }
};

export default TravelRequestComment;
