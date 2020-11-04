import UserServices from '../services/user.service';
import usersError from '../utils/userserror';
// get all users in database
const getAllUsers = async (req, res, next) => {
  try {
    const { page } = req.query;
    const options = {
      attributes: ['id', 'username', 'address'],
      page, // Default 1
      paginate: 2, // Default 25
      order: [['username', 'DESC']],
    };
    const record = await UserServices.getAllUsers(options);
    if (record.pages < page) throw new usersError(`only ${record.pages} pages available`, 404);
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { next(err); }
};
export default getAllUsers;
