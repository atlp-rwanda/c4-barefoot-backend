import UserServices from '../services/user.service';
import UsersError from '../utils/userserror';
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
    if (!record) throw new UsersError('no users found', 400);
    if (record.pages < page) throw new UsersError(`only ${record.pages} pages available`, 400);
    res.status(200).json({ status: 200, message: 'successful got all users', data: record });
  } catch (err) { next(err); }
};
export default getAllUsers;
