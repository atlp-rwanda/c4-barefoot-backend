"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotification = exports.findNotificationById = exports.findAllNotification = exports.createNotification = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var createNotification = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var notification;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].Notification.create(data);

          case 2:
            notification = _context.sent;
            return _context.abrupt("return", notification);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createNotification(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNotification = createNotification;

var findAllNotification = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var notification;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models["default"].Notification.findAndCountAll({
              where: {
                user_id: data
              }
            });

          case 2:
            notification = _context2.sent;
            return _context2.abrupt("return", notification);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findAllNotification(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findAllNotification = findAllNotification;

var findNotificationById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var notification;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models["default"].Notification.findOne({
              where: {
                id: data
              }
            });

          case 2:
            notification = _context3.sent;
            return _context3.abrupt("return", notification);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findNotificationById(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findNotificationById = findNotificationById;

var updateNotification = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var notification;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].Notification.update({
              status: 'readed'
            }, {
              where: {
                id: data
              }
            });

          case 2:
            notification = _context4.sent;
            return _context4.abrupt("return", notification);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateNotification(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNotification = updateNotification;