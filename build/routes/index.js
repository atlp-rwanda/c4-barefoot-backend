"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _landingPageRoute = _interopRequireDefault(require("./api/landingPageRoute"));

var _userprofile = _interopRequireDefault(require("./api/userprofile"));

var _user = _interopRequireDefault(require("./api/user"));

var _travelRequestRoutes = _interopRequireDefault(require("./api/travelRequestRoutes"));

var _directReports = _interopRequireDefault(require("./api/directReports"));

var _travelCommentsRoutes = _interopRequireDefault(require("./api/travelCommentsRoutes"));

var _assignUserToManager = _interopRequireDefault(require("./api/assignUserToManager"));

var _adminRoutes = _interopRequireDefault(require("./api/adminRoutes"));

var _accessControl = _interopRequireDefault(require("../middlewares/accessControl"));

var _locationsRoute = _interopRequireDefault(require("./api/locationsRoute"));

var _accommodationsRoute = _interopRequireDefault(require("./api/accommodationsRoute"));

var _amenityRoute = _interopRequireDefault(require("./api/amenityRoute"));

var _ratesAndReviewsRoutes = _interopRequireDefault(require("./api/ratesAndReviewsRoutes"));

var _bookingsRoute = _interopRequireDefault(require("./api/bookingsRoute"));

var _notification = _interopRequireDefault(require("./api/notification"));

var routes = _express["default"].Router();

routes.use('/user', _user["default"]);
routes.use('/requests', _travelRequestRoutes["default"]);
routes.use('/directReports', _directReports["default"]);
routes.use('/comment', _travelCommentsRoutes["default"]);
routes.use('/ratings', _ratesAndReviewsRoutes["default"]);
routes.use('/assignUserstoManager', _assignUserToManager["default"]);
routes.use('/', _landingPageRoute["default"]);
routes.use('/locations', _locationsRoute["default"]);
routes.use('/accommodations', _accommodationsRoute["default"]);
routes.use('/amenities', _amenityRoute["default"]);
routes.use('/admin', (0, _accessControl["default"])(['all']), _adminRoutes["default"]);
routes.use('/bookings', _bookingsRoute["default"]);
routes.use('/profile', _userprofile["default"]);
routes.use('/notification', _notification["default"]);
var _default = routes;
exports["default"] = _default;