import BadRequestError from '../utils/Errors/badRequestError';
import findTravelRequest from '../services/travelRequestSearch';
import travelRequestServices from '../services/directTravelRequest';
import getDataFromToken from '../helper/tokenToData';
import { createTravelComment } from '../services/createTravelRequestComment';
import findUserById from '../services/findUserById';
import isManagerExist from '../services/findManagerById'
import manager from '../services/findManager'
import models from '../models';
import sendEmail from '../helper/sendEmail';
import { decode } from 'jsonwebtoken';

const TravelRequestComment = async (req, res, next) => {
  let reciver;
  try {
    const decoded = await getDataFromToken(req, res, next);
    const userId = decoded.id;
    const request_id = req.params.travelId;
    const travel= await models.TravelRequest.findOne({ where: { travelId:request_id } })
    console.log(travel)
    
    if(travel) {
      const { comment } = req.body;
      if (comment) {
          const commentBody = {
            userId: decoded.id,
            travelId: request_id,
            comment
          };
          console.log("hey ther")
        if(decoded.id ===travel.userId){
          reciver = await manager(travel.manager_id)
          console.log("hey ther")
        }else if(decoded.id===travel.managerId){
          reciver = await findUserById(travel.userId)
          console.log(reciver)
        }
        const mailOptions = {
          email: reciver.email,
          subject: 'Your travel request',
          name:reciver.username,
          body: `${decoded.username} commented on the travel request you created or you manage.`
        };
        await sendEmail(mailOptions);
  
          try {
            createTravelComment(req, res, commentBody, next);
            // if (updateStatus) {
              //in-app notification and email notification
              const newNotificantion = {
                userId: decoded.id,
                title: 'your Travel Request',
                message: `Your travel request was ${req.body.action}ed!`
                  };
                  
               const notification = await models.Notification.create(newNotificantion);
              //  pusher.trigger('bare-foot-normad', 'notification', notification);
              //  const mail = await TravelRequestComments (user.email, req.body);
              
              res.status(201).json({ status: 201, message: 'Operation performed successfully!' });
              next();
            // }
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
