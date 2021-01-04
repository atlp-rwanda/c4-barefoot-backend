"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var schema = _joi["default"].object({
  first_name: _joi["default"].string().required().regex(/^[A-Za-z]+$/),
  last_name: _joi["default"].string().required().regex(/^[A-Za-z]+$/),
  username: _joi["default"].string().required().min(5),
  occupation: _joi["default"].string().required().min(4),
  email: _joi["default"].string().email().required(),
  bio: _joi["default"].string().min(0).allow('').allow(null),
  password: _joi["default"].string().required().min(8),
  address: _joi["default"].string().required(),
  language: _joi["default"].string().required().regex(/^[A-Za-z]+$/),
  profile_picture: _joi["default"].string()
});

var _default = function _default(req, res, next) {
  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message, 400);
  }

  next();
};

exports["default"] = _default;