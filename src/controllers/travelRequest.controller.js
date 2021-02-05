import isAccommodationExist from '../helper/isAccomodationExist';
import getDataFromToken from '../helper/tokenToData';
import createTravelRequest from '../services/createTravelRequest';
import travelRequestServices from '../services/directTravelRequest';
import ApplicationError from '../utils/Errors/applicationError';
import BadRequestError from '../utils/Errors/badRequestError';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';
import rejectTravelRequestEmail from '../middlewares/sendNotificationEmail';
import { cancelTravelRequestEmail } from '../middlewares/sendNotificationEmail'

import pusher from '../config/pusher';
import models from '../models';

export const travelRequest = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
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
          throw new NotFoundRequestError(res.__('Accommodation not found, try again'));
        } else if (counter == 0) {
          createTravelRequest(req, res, request, next);
        }
      }
    } else {
      throw new BadRequestError(res.__('You need a Manager First.'), 400); // added error handling
    }
  } catch (err) {
    next(err);
  }
};

export const cancel_travelRequest = async (req, res, next) => {
  const { travelRequestId, action } = req.body;
  const decoded = await getDataFromToken(req, res, next);

  try {
    if (action === 'cancel') {
      const userId = decoded.id;
      const findTravelRequest = await travelRequestServices.findItById({ travelId: travelRequestId });
      if (findTravelRequest) {
        if (findTravelRequest.userId === userId) {
          const changes = 'canceled';
          if (findTravelRequest.status === 'pending') {
            const updateStatus = await travelRequestServices.updateStatus({ travelId: travelRequestId, status: { status: changes } });
            if (updateStatus) {
              const newNotificantion = {
                user_id: userId,
                title: res.__('Cancel Travel Request'),
                message: `You ${req.body.action}ed your travel request`
                  };

               const notification = await models.Notification.create(newNotificantion);
               console.log(notification);
               const mail = await cancelTravelRequestEmail(decoded.email, req.body.action);
               console.log(mail);

              return res.status(201).json({ status: 201, message: res.__('Travel request canceled successfully!') });
            }
            throw new ApplicationError(res.__('Failed to cancel this travel request, try again!'), 500);
          } else {
            throw new BadRequestError(res.__(`Can not cancel this travel request, because it is ${findTravelRequest.status}`), 400);
          }
        } else {
          throw new ApplicationError(res.__('Not allowed to cancel this travel request'), 403);
        }
      } else {
        throw new NotFoundRequestError(res.__('The travel request does not exist!'), 404);
      }
    } else {
      throw new BadRequestError(res.__('Can not perform this operation!'), 400);
    }
  } catch (error) {
    next(error);
  }
};
