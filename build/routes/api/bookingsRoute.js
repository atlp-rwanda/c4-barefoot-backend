"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bookingsController = _interopRequireDefault(require("../../controllers/bookingsController"));

var _accessControl = _interopRequireDefault(require("../../middlewares/accessControl"));

var router = _express["default"].Router();

router.get('/', (0, _accessControl["default"])(['book accommodations']), _bookingsController["default"]);
var _default = router;
exports["default"] = _default;