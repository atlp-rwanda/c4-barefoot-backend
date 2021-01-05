"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pusher = _interopRequireDefault(require("../config/pusher"));

var _findUserById = _interopRequireDefault(require("../services/findUserById"));

var _models = _interopRequireDefault(require("../models"));

var _sendNotificationEmail = _interopRequireDefault(require("../middlewares/sendNotificationEmail"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _notification = require("../services/notification");

var assignUsersToManager = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, manager_id, user, newNotificantion, notification, notifiEmail;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.params.id;
            manager_id = req.body.manager_id;
            _context.prev = 2;
            _context.next = 5;
            return (0, _findUserById["default"])(userId);

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            throw new _notFoundRequestError["default"]("User with this ".concat(userId, " is not exist"), 404);

          case 8:
            newNotificantion = {
              user_id: userId,
              title: 'Assign user to manager',
              message: "You were assigned to manager of ".concat(manager_id)
            };

            _models["default"].User.update({
              manager_id: manager_id
            }, {
              where: {
                email: user.email
              }
            });

            _context.next = 12;
            return (0, _notification.createNotification)(newNotificantion);

          case 12:
            notification = _context.sent;

            _pusher["default"].trigger('bare-foot-normad', 'notification', {
              notification: notification
            });

            _context.next = 16;
            return (0, _sendNotificationEmail["default"])(user.email);

          case 16:
            notifiEmail = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              status: 200,
              message: "user was assigned to manager with this Id ".concat(manager_id)
            }));

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](2);
            res.status(500).json({
              error: _context.t0.message,
              stack: _context.t0.stack
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 20]]);
  }));

  return function assignUsersToManager(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = assignUsersToManager;
exports["default"] = _default;