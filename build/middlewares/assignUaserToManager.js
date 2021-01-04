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
    manager_id: _joi["default"].string().required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) {
    throw new _badRequestError["default"](error.details[0].message);
  } // return res.status(400).json({ error: error.details[0].message });


  next();
}