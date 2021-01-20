import models from '../models';

const manager = async (data, page = 1) => {
  const pageSize = 12;
  const skip = parseInt((page - 1) * pageSize, 10);
  // const verifiedUserManager = await models.User.findAndCountAll({
  //   offset: skip, limit: pageSize, where: { verified: true, user_role_id: data }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  // });
  // return verifiedUserManager;
};
export default manager;
