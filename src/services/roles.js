import fs from 'fs';
import models from '../models';
import path from 'path'

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

exports.readFile = () =>{
  const file= path.resolve(__dirname,'../config/permissions/index.json');
  return fs.readFileSync(file)};

exports.saveInFile = (data) => {
  const file= path.resolve(__dirname,'../config/permissions/index.json');
  return fs.writeFileSync(file, data)};

exports.roles = async () => {
  const role = await models.Role.findAll();
  return role;
};
exports.updateRole = async (data,id) => {
  const result = await models.Role.update(data,{where:{id:id}});
  return result;
};
