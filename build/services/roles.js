"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _models = _interopRequireDefault(require("../models"));

exports.createOne = function (data) {
  var created = _models["default"].Role.create(data);

  return created;
};

exports.findRole = function (data) {
  var found = _models["default"].Role.findOne({
    where: {
      name: data.name
    }
  });

  return found;
};

exports.findRoles = function (data) {
  var foundRoles = _models["default"].Role.findAndCountAll(data);

  return foundRoles;
};

exports.findRoleById = function (query) {
  var role = _models["default"].Role.findOne({
    where: {
      id: query.id
    }
  });

  return role;
};

exports.changeRole = function (query) {
  var changes = _models["default"].User.update({
    user_role_id: query.change
  }, {
    where: {
      user_role_id: query.role_id
    }
  });

  return changes;
};

exports.deleteOne = function (data) {
  var deleted = _models["default"].Role.destroy({
    where: {
      id: data
    }
  });

  return deleted;
};

exports.readFile = function () {
  return _fs["default"].readFileSync('./src/config/permissions/index.json');
};

exports.saveInFile = function (data) {
  return _fs["default"].writeFileSync('./src/config/permissions/index.json', data);
};

exports.roles = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var role;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _models["default"].Role.findAll();

        case 2:
          role = _context.sent;
          return _context.abrupt("return", role);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));