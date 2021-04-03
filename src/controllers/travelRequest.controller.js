import isAccommodationExist from '../helper/isAccomodationExist';
import getDataFromToken from '../helper/tokenToData';
import createTravelRequest from '../services/createTravelRequest';
import travelRequestServices from '../services/directTravelRequest';
import ApplicationError from '../utils/Errors/applicationError';
import BadRequestError from '../utils/Errors/badRequestError';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';
import pusher from '../config/pusher';
import models from '../models';
import sendEmail from '../helper/sendEmail';
import findUserById from '../services/findUserById'

export const travelRequest = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  console.log(decoded);
  try {
    if (decoded.manager_id) {
      const request = {
        managerId: decoded.manager_id,
        userId: decoded.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      let counter = req.body.trip.length;
      for (const records of req.body.trip) {
        counter -= 1;
        const isAccommodationValid = await isAccommodationExist(records.accommodationId, next);
        if (!isAccommodationValid) {
          throw new NotFoundRequestError('Accommodation not found, try again');
        } else if (counter == 0) {
          createTravelRequest(req, res, request, next);
        }
      }
      const manager = await findUserById(decoded.manager_id)
      console.log(manager.id);
      
      const mailOptions = {
        email: manager.email,
        subject: 'your user has made a request',
        name: manager.username,
        body: "<p></br>Hope this email finds you well. Thank you for sending your request at</br>Barefoot nomad ,the user you are assigned to has made a travel request.</p><p>Kindly regard</p>"
      };
      await sendEmail(mailOptions);
      res.status(201).json({ status: 201, message: 'Operation performed successfully!' });
      next();
    } else {
      throw new BadRequestError(('You need a Manager First.'), 400); // added error handling
    }
  } catch (err) {
    next(err);
  }
};

export const cancel_travelRequest = async (req, res, next) => {
  const { travelRequestId, action } = req.body;
  const decoded = await getDataFromToken(req, res, next);
try {
      const userId = decoded.id;
      const findTravelRequest = await travelRequestServices.findItById({ travelId: travelRequestId });
      const user = await findUserById(findTravelRequest.userId);
      if (findTravelRequest) {
        if (findTravelRequest.userId === userId) {
          const changes = 'canceled';
          if (findTravelRequest.status === 'pending') {
            const updateStatus = await travelRequestServices.updateStatus({ travelId: travelRequestId, status: { status: changes } });
            if (updateStatus) {
              const newNotificantion = {
                user_id: userId,
                title: 'Cancel Travel Request',
                message: `You ${req.body.action}ed your travel request`
                  };
               const notification = await models.Notification.create(newNotificantion);
               pusher.trigger('bare-foot-normad', 'notification', notification);
               const mailOptions = {
                email: user.email,
                name:user.username,
                subject: 'You canceled travel request',
                body: "<p></br>Hope this email finds you well. Thank you for sending your request at</br>Barefoot nomad ,You  have been assigned to a manager.</p><p>Kindly regard</p>",
              };
              await sendEmail(mailOptions);
              return res.status(201).json({ status: 201, message: 'Travel request canceled successfully!' });
            }
            throw new ApplicationError(('Failed to cancel this travel request, try again!'), 500);
          } else {
            throw new BadRequestError((`Can not cancel this travel request, because it is ${findTravelRequest.status}`), 400);
          }
        } else {
          throw new ApplicationError(('Not allowed to cancel this travel request'), 403);
        }
      } else {
        throw new NotFoundRequestError(('The travel request does not exist!'), 404);
      }
  } catch (error) {
    next(error);
  }
};
