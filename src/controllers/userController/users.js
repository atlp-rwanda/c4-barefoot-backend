import UserServices from '../../services/user.service';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';

// get all users in database
const getAllUsers = async (req, res, next) => {
  try {
    const { page } = req.query;
    const options = {
      attributes: ['id', 'username', 'address'],
      page, // Default 1
      paginate: 5, // Default 25
      order: [['username', 'DESC']],
    };
    const record = await UserServices.getAllUsers(options);
    if (!record) throw new NotFoundRequestError(('no users found'), 400);
    if (record.pages < page) throw new NotFoundRequestError(`only ${record.pages} pages available`, 404);
    res.status(200).json({ status: 200, message: ('successful got all users'), data: record });
  } catch (err) { next(err); }
};
export default getAllUsers;
