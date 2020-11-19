import fs from 'fs';
import models from '../models';

exports.createOne = (data) => {
  const created = models.Role.create(data);
  return created;
};

exports.findRole = (data) => {
  const found = models.Role.findOne({ where: { name: data.name } });
  return found;
};
exports.findRoles = (data) => {
  const foundRoles = models.Role.findAndCountAll(data);
  return foundRoles;
};

exports.findRoleById = (query) => {
  const role = models.Role.findOne({ where: { id: query.id } });
  return role;
};
exports.changeRole = (query) => {
  const changes = models.User.update({ user_role_id: query.change }, { where: { user_role_id: query.role_id } });
  return changes;
};
exports.deleteOne = (data) => {
  const deleted = models.Role.destroy({ where: { id: data } });
  return deleted;
};

exports.readFile = () => fs.readFileSync('./src/config/permissions/index.json');

exports.saveInFile = (data) => fs.writeFileSync('./src/config/permissions/index.json', data);

exports.roles = async () => {
  const role = await models.Role.findAll();
  return role;
};
