"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _joi = _interopRequireDefault(require("joi"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

function _default(req, res, next) {
  var schema = _joi["default"].object({
    travelRequestId: _joi["default"].string().required().min(36).max(36),
    action: _joi["default"].string().required().min(6).max(7)
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  }

  next();
}