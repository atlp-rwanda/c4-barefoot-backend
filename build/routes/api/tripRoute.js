"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _isLogedIn = _interopRequireDefault(require("../../helper/isLogedIn"));

var _accessControl = _interopRequireDefault(require("../../middlewares/accessControl"));

var _viewTripHistory = require("../../controllers/viewTripHistory");

var router = _express["default"].Router();

router.get('/:location', _isLogedIn["default"], (0, _accessControl["default"])(['view travel requests']), _viewTripHistory.getTripHistory);
router.get('/', _isLogedIn["default"], (0, _accessControl["default"])(['view travel requests']), _viewTripHistory.getTotalOfTripsByLocation);
var _default = router;
exports["default"] = _default;