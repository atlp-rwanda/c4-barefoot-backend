"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

var _notification = require("../../services/notification");

var _auth = require("../../utils/auth");

var updateNotifications = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var notificationId, status, userData, token, decoded, notification, updated;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            notificationId = req.params.id;
            status = 'readed';
            userData = req.headers.authorization;

            if (userData) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              status: 401,
              message: 'Unauthorized, Please login!'
            }));

          case 5:
            token = userData.split(' ')[1];
            _context.next = 8;
            return (0, _auth.verifyToken)(token);

          case 8:
            decoded = _context.sent;
            _context.next = 11;
            return (0, _notification.findNotificationById)(notificationId);

          case 11:
            notification = _context.sent;

            if (notification) {
              _context.next = 14;
              break;
            }

            throw new _notFoundRequestError["default"]('notification not found', 404);

          case 14:
            _context.prev = 14;
            _context.next = 17;
            return (0, _notification.updateNotification)(notificationId);

          case 17:
            updated = _context.sent;
            console.log(updated);
            return _context.abrupt("return", res.status(200).json({
              status: 200,
              message: 'notification updated successful!'
            }));

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](14);
            console.log(_context.t0.message, _context.t0.stack);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[14, 22]]);
  }));

  return function updateNotifications(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = updateNotifications;
exports["default"] = _default;