import { required } from 'joi';
import models from '../models';

const isManagerExist = async (data) => {
  const manager= await models.User.findOne({
    where: { manager_id: data }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  });
  return manager;
};
export default isManagerExist;
