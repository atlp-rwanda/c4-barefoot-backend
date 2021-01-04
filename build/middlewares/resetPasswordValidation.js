"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateResetPassword = exports.RequestResetEmail = void 0;

var _joi = _interopRequireDefault(require("joi"));

var RequestResetEmail = function RequestResetEmail(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) return res.status(400).send(error.details[0].message);
  next();
};

exports.RequestResetEmail = RequestResetEmail;

var validateResetPassword = function validateResetPassword(req, res, next) {
  var schema = _joi["default"].object({
    password: _joi["default"].string().min(8).max(100).required(),
    confirmPassword: _joi["default"].string().min(8).max(100).required()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error;

  if (error) return res.status(400).send(error.details[0].message);
  next();
};

exports.validateResetPassword = validateResetPassword;