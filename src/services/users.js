import models from '../models';

exports.findUsers = (query) => {
  query.include = [{ model: models.Role, as: 'user_role' }, { model: models.User, as: 'line_manager', attributes: ['id', 'first_name', 'last_name'] }];
  const users = models.User.findAndCountAll(query);

  return users;
};

exports.getUser = (query) => {
  const user = models.User.findOne({ where: { email: query.email } });

  return user;
};

exports.updateUserRole = (query) => {
  const upDate = models.User.update({ user_role_id: query.user_role_id }, { where: { email: query.email } });
  return upDate;
};

exports.deleteUser = (data) => {
  const deleting = models.User.destroy({ where: { email: data } });
  return deleting;
};

exports.findManagerById = (query) => {
  const found = models.User.findByPk(query);
  return found;
};

exports.updateUser = (query) => {
  const upDating = models.User.update({ manager_id: query.manager_id }, { where: { email: query.email } });
  return upDating;
};

exports.changeRole = (query) => {
  const changes = models.User.update({ manager_id: query.change }, { where: { manager_id: query.manager_id } });
  const changeAlso = models.User.update({ manager_id: query.change }, { where: { id: query.manager_id } });
  return changes, changeAlso;
};

exports.findRelations = (query) => {
  const relations = models.User.findOne({ where: { manager_id: query.id } });
  return relations;
};
