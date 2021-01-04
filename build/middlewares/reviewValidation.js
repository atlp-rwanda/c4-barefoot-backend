"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var reviewValidation = function reviewValidation(req, res, next) {
  var schema = _joi["default"].object({
    rate: _joi["default"].number().min(1).max(5).required(),
    review: _joi["default"].string().min(3).max(255)
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
};

var _default = reviewValidation;
exports["default"] = _default;