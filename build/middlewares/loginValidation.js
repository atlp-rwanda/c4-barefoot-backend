"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var schema = _joi["default"].object({
  email: _joi["default"].string().email().required(),
  password: _joi["default"].string().required().min(8)
});

var _default = function _default(req, res, next) {
  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

exports["default"] = _default;