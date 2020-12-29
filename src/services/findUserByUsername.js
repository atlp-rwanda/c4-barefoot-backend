import models from '../models';

const isUserExist = async (data) => {
  const user = await models.User.findOne({
    where: { username: data }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  });
  return user;
};
export default isUserExist;
