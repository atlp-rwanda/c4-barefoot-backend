"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editTripValidation = exports.createTripValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var createTripValidation = function createTripValidation(req, res, next) {
  var schema = _joi["default"].object({
    status: _joi["default"].string(),
    trip: _joi["default"].array().items(_joi["default"].object({
      originCity: _joi["default"].string().required(),
      destination: _joi["default"].string().required(),
      tripDate: _joi["default"].date().iso().required().messages({
        "date.format": "'Trip Date is not a correct iso 8601 format'"
      }),
      returnDate: _joi["default"].date().iso().messages({
        "date.format": "'Returning Date is not a correct iso 8601 format'"
      }),
      accommodationId: _joi["default"].string().required(),
      reason: _joi["default"].string().required()
    })).required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) throw new _badRequestError["default"](error.details[0].message);
  next();
};

exports.createTripValidation = createTripValidation;

var editTripValidation = function editTripValidation(req, res, next) {
  var schema = _joi["default"].object({
    tripId: _joi["default"].string().min(36).max(36).required(),
    updates: _joi["default"].object({
      originCity: _joi["default"].string(),
      destination: _joi["default"].string(),
      tripDate: _joi["default"].date().iso().messages({
        "date.format": "'Trip Date is not a correct iso 8601 format'"
      }),
      returnDate: _joi["default"].date().iso().messages({
        "date.format": "'Returning Date is not a correct iso 8601 format'"
      }),
      accommodationId: _joi["default"].string().min(36).max(36),
      reason: _joi["default"].string()
    }).required()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error;

  if (error) throw new _badRequestError["default"](error.details[0].message);

  if (Object.keys(req.body.updates).length === 0) {
    throw new _badRequestError["default"]("updates can not be empty!");
  }

  next();
};

exports.editTripValidation = editTripValidation;