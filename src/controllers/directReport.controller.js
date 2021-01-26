import findTravelRequest from '../services/travelRequestSearch';
import getDataFromToken from '../helper/tokenToData';
import roles from '../utils/roles';
import travelRequestServices from '../services/directTravelRequest';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';
import ApplicationError from '../utils/Errors/applicationError';
import BadRequestError from '../utils/Errors/badRequestError';
import pusher from '../config/pusher';
import models from '../models';
import findUserById from '../services/findUserById';
import sendEmail from '../helper/sendEmail';

export const getDirectReport = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  try {
    const managerId = decoded.id.toString();
    const role = decoded.user_role_id;
    const roleType = role === roles.MANAGER;
    const offset = req.query.from;
    const limit = req.query.to;
    const { travelId } = req.params;
    const pagination = { offset, limit };
    if (managerId && roleType) {
      if (travelId) {
        const query = { managerId, travelId };
        findTravelRequest(res, query, next, pagination);
      } else {
        const query = { managerId };
        findTravelRequest(res, query, next, pagination);
      }
    } else {
      res.status(401).json({ message: 'you are not an approved manager' });
    }
  } catch (e) {
    next(e);
  }
};
export const approve_reject_TravelRequest = async (req, res, next) => {
  const { travelRequestId, action } = req.body;
  const decoded = await getDataFromToken(req, res, next);
  try {
    if (action === 'approve' || action === 'reject') {
      const findTravelRequest = await travelRequestServices.findItById({ travelId: travelRequestId });
      const user = await findUserById(findTravelRequest.userId);
      if (findTravelRequest) {
        const userId = decoded.id;
        if (findTravelRequest.managerId === userId) {
          // travel request can be approve if it is pending or rejected
          // and can be rejected if it is pending only
          if (findTravelRequest.status === 'pending'|| (findTravelRequest.status === 'rejected' && action !== 'reject')) {
            const changes = (action === 'approve') ? 'approved' : 'rejected';
            const updateStatus = await travelRequestServices.updateStatus({ travelId: travelRequestId, status: { status: changes } });
          if (updateStatus) {
              //in-app notification and email notification
              const newNotificantion = {
                user_id: user.id,
                title: `${req.body.action} Travel Request`,
                message: `Your travel request was ${req.body.action}ed!`
                  };
                  const notification = await models.Notification.create(newNotificantion);
                //  pusher.trigger('bare-foot-normad', 'notification', notification);
                const mailOptions = {
                  email: email,
                  subject: 'Your travel request',
                  html: ` <p>
                  Hi Lynda,</br>                                                                                                         
                        Hope this email finds you well. Thank you for sending your request at</br>
                        Barefoot nomad ,Your travel request have been ${req.body.action}d.                                   
                </p>
                <p>Kindly regard</p>`
                };
                await sendEmail(mailOptions);
                res.status(201).json({ status: 201, message: 'Operation performed successfully!' });
                next();
            }
            throw new ApplicationError('Failed to approve this travel request, try again!', 500);
          } else {
            throw new BadRequestError(`The travel request is already ${findTravelRequest.status}`, 400);
          }
        } else {
          throw new ApplicationError('Failed to access this travel request!', 500);
        }
      } else {
        throw new NotFoundRequestError('The travel request does not exist!', 404);
      }
    } else {
      throw new BadRequestError('Can not perform this action', 400);
    }
  } catch (error) {
    next(error);
  }
};














