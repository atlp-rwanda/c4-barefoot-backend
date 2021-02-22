import models from '../models';

const isUserVerified = async (page = 1) => {
  const pageSize = 10;
  const skip = parseInt((page - 1) * pageSize, 10);
  const verifiedUser = await models.User.findAndCountAll({
    limit: pageSize, offset: skip, where: { verified: true }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  });
  return verifiedUser;
};
export default isUserVerified;
