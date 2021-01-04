"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _models = _interopRequireDefault(require("../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var findTravelRequest = function findTravelRequest(res, query, next, pagination) {
  var resultSet = [];

  _models["default"].TravelRequest.findAndCountAll(_objectSpread({
    where: query
  }, pagination)).then(function (tRequestDataSet) {
    if (tRequestDataSet.rows.length > 0) {
      var counter = tRequestDataSet.rows.length;
      tRequestDataSet.rows.forEach(function (tRequestData) {
        _models["default"].Trip.findAll({
          where: {
            travelId: tRequestData.travelId
          }
        }).then(function (tripData) {
          counter -= 1;

          if (tripData != null) {
            var allData = _objectSpread(_objectSpread({}, tRequestData.get({
              plain: true
            })), {}, {
              Trip: tripData
            });

            resultSet.push(allData);

            if (counter === 0) {
              res.json(resultSet);
            }
          }
        })["catch"](function (err) {
          next(err);
        });
      });
    } else {
      res.status(404).json({
        message: 'Travel request(s) Not Found'
      });
    }
  })["catch"](function (err) {
    next(err);
  });
};

var _default = findTravelRequest;
exports["default"] = _default;