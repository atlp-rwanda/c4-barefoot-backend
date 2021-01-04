"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _models = _interopRequireDefault(require("../models"));

exports.findUsers = function (query) {
  query.include = [{
    model: _models["default"].Role,
    as: 'user_role'
  }, {
    model: _models["default"].User,
    as: 'line_manager',
    attributes: ['id', 'first_name', 'last_name']
  }];

  var users = _models["default"].User.findAndCountAll(query);

  return users;
};

exports.getUser = function (query) {
  var user = _models["default"].User.findOne({
    where: {
      email: query.email
    }
  });

  return user;
};

exports.updateUserRole = function (query) {
  var upDate = _models["default"].User.update({
    user_role_id: query.user_role_id
  }, {
    where: {
      email: query.email
    }
  });

  return upDate;
};

exports.deleteUser = function (data) {
  var deleting = _models["default"].User.destroy({
    where: {
      email: data
    }
  });

  return deleting;
};

exports.findManagerById = function (query) {
  var found = _models["default"].User.findByPk(query);

  return found;
};

exports.updateUser = function (query) {
  var upDating = _models["default"].User.update({
    manager_id: query.manager_id
  }, {
    where: {
      email: query.email
    }
  });

  return upDating;
};

exports.changeRole = function (query) {
  var changes = _models["default"].User.update({
    manager_id: query.change
  }, {
    where: {
      manager_id: query.manager_id
    }
  });

  var changeAlso = _models["default"].User.update({
    manager_id: query.change
  }, {
    where: {
      id: query.manager_id
    }
  });

  return changes, changeAlso;
};

exports.findRelations = function (query) {
  var relations = _models["default"].User.findOne({
    where: {
      manager_id: query.id
    }
  });

  return relations;
};