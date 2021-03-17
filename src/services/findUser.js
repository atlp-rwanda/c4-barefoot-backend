import models from '../models';

const isUserExist = async (data) => {
  const user = await models.User.findOne({ where: { email: data } });
  return user;
};
export default isUserExist;
