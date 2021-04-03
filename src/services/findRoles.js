import models from '../models';

const roles = async (data) => {
  const role = await models.Role.findOne({ where: { id: data } });
  return role;
};
export default roles;
