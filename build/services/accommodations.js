"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = _interopRequireDefault(require("../models"));

var getAccommodation = function getAccommodation() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  if (Number.isNaN(page)) {
    page = 1;
  }

  var pageSize = 2;
  var skip = (page - 1) * pageSize;

  var accommodations = _models["default"].Accommodation.findAndCountAll({
    limit: pageSize,
    offset: skip
  });

  return accommodations;
};

var getSingleAccommodation = function getSingleAccommodation(query) {
  var singleAccommodation = _models["default"].Accommodation.findOne({
    where: {
      id: query
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  });

  return singleAccommodation;
};

var _default = {
  getAccommodation: getAccommodation,
  getSingleAccommodation: getSingleAccommodation
};
exports["default"] = _default;