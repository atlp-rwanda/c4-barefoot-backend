import db from '../models';
import dbDataNotFoundError from '../utils/Errors/notFoundRequestError';

const findTravelRequestComments = (res, query, next, pagination) => {
  try {
    db.TravelComments.findAndCountAll({ where: query, ...pagination })
      .then((tRequestComments) => {
        if (tRequestComments.rows.length > 0) {
          res.status(200).json(tRequestComments.rows);
        } else {
          throw new dbDataNotFoundError(res.__('No comments found'));
        }
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
export default findTravelRequestComments;
