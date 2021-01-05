"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignLineManagerValidation = exports.deleteValidationEmail = exports.deleteValidation = exports.updateUserRoleValidation = exports.updateValidation = exports.roleValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var roleValidation = function roleValidation(req, res, next) {
  var schema = _joi["default"].object({
    role: _joi["default"].string().min(2).max(50).required(),
    description: _joi["default"].string().min(5).max(500).required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

exports.roleValidation = roleValidation;

var updateValidation = function updateValidation(req, res, next) {
  var schema = _joi["default"].object({
    role: _joi["default"].string().min(2).max(50).required(),
    permissions: _joi["default"].object().required()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

exports.updateValidation = updateValidation;

var updateUserRoleValidation = function updateUserRoleValidation(req, res, next) {
  var schema = _joi["default"].object({
    role: _joi["default"].string().min(2).max(50).required(),
    email: _joi["default"].string().min(5).email().max(50).required()
  });

  var _schema$validate3 = schema.validate(req.body),
      error = _schema$validate3.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

exports.updateUserRoleValidation = updateUserRoleValidation;

var deleteValidation = function deleteValidation(req, res, next) {
  var schema = _joi["default"].object({
    role: _joi["default"].string().min(2).max(50).required()
  });

  var _schema$validate4 = schema.validate(req.body),
      error = _schema$validate4.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

exports.deleteValidation = deleteValidation;

var deleteValidationEmail = function deleteValidationEmail(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().min(5).email().max(50).required()
  });

  var _schema$validate5 = schema.validate(req.body),
      error = _schema$validate5.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

exports.deleteValidationEmail = deleteValidationEmail;

var assignLineManagerValidation = function assignLineManagerValidation(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().min(5).max(50).required(),
    manager_id: _joi["default"].string().min(36).max(36).required()
  });

  var _schema$validate6 = schema.validate(req.body),
      error = _schema$validate6.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

exports.assignLineManagerValidation = assignLineManagerValidation;