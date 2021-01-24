import BadRequestError from '../utils/Errors/badRequestError';
import findTravelRequest from '../services/travelRequestSearch';
import travelRequestServices from '../services/directTravelRequest';
import getDataFromToken from '../helper/tokenToData';
import { createTravelComment } from '../services/createTravelRequestComment';
import findUserById from '../services/findUserById';
import models from '../models';
import sendEmail from '../helper/sendEmail';

const TravelRequestComment = async (req, res, next) => {
  try {
    const decoded = await getDataFromToken(req, res, next);
    const userId = decoded.id;
    const request_id = req.params.travelId;
    const { comment } = req.body;
    if (request_id) {
      if (comment) {
        const commentBody = {
          userId: decoded.id,
          travelId: request_id,
          comment
        };

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
            const mailOptions = {
              email: decoded.email,
              subject: 'Your travel request',
              html: `<p>Hi, <br> Your travel request was commented.</p> <br>`
            };
            await sendEmail(mailOptions);
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
      throw new BadRequestError(('You must provide request id'));
    }
  } catch (err) {
    next(err);
  }
};

export default TravelRequestComment;
