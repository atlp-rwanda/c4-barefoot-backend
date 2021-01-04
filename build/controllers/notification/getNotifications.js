"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pusher = _interopRequireDefault(require("pusher"));

var _findUserById = _interopRequireDefault(require("../../services/findUserById"));

var _models = _interopRequireDefault(require("../../models"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

var _auth = require("../../utils/auth");

var _findUserByUsername = _interopRequireDefault(require("../../services/findUserByUsername"));

var notific = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userData, token, decoded, user, notifications;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userData = req.headers.authorization;

            if (userData) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              status: 401,
              message: 'Unauthorized, Please login!'
            }));

          case 3:
            token = userData.split(' ')[1];
            _context.next = 6;
            return (0, _auth.verifyToken)(token);

          case 6:
            decoded = _context.sent;
            _context.next = 9;
            return (0, _findUserByUsername["default"])(decoded.username);

          case 9:
            user = _context.sent;
            _context.prev = 10;
            _context.next = 13;
            return _models["default"].Notification.findAndCountAll({
              where: {
                user_id: user.id
              }
            });

          case 13:
            notifications = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              status: 200,
              message: ' user\'s Notifications',
              notifications: notifications
            }));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](10);
            res.json(_context.t0.message, _context.t0.stack);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 17]]);
  }));

  return function notific(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = notific;
exports["default"] = _default;