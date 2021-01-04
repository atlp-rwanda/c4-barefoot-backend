"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneBooking = void 0;

var _models = _interopRequireDefault(require("../models"));

var getOneBooking = function getOneBooking(query) {
  var booked = _models["default"].Booking.findOne({
    attributes: ["id"],
    where: {
      username: query.username,
      accommodationId: query.accommodationId
    }
  });

  return booked;
};

exports.getOneBooking = getOneBooking;