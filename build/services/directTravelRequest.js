"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _models = _interopRequireDefault(require("../models"));

exports.findItById = function (query) {
  var travelReq = _models["default"].TravelRequest.findOne({
    where: {
      travelId: query.travelId
    }
  });

  return travelReq;
};

exports.updateStatus = function (query) {
  var change = _models["default"].TravelRequest.update(query.status, {
    where: {
      travelId: query.travelId
    }
  });

  return change;
};

exports.findTrip = function (query) {
  var search = _models["default"].Trip.findOne({
    where: {
      tripId: query.tripId,
      travelId: query.travelId
    }
  });

  return search;
};

exports.updateTrip = function (query) {
  var updates = _models["default"].Trip.update(query.changes, {
    where: {
      tripId: query.tripId
    }
  });

  return updates;
};