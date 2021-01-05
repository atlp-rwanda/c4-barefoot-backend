"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancel_travelRequest = exports.travelRequest = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isAccomodationExist = _interopRequireDefault(require("../helper/isAccomodationExist"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _createTravelRequest = _interopRequireDefault(require("../services/createTravelRequest"));

var _directTravelRequest = _interopRequireDefault(require("../services/directTravelRequest"));

var _applicationError = _interopRequireDefault(require("../utils/Errors/applicationError"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _sendNotificationEmail = _interopRequireWildcard(require("../middlewares/sendNotificationEmail"));

var _pusher = _interopRequireDefault(require("../config/pusher"));

var _models = _interopRequireDefault(require("../models"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var travelRequest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var decoded, request, counter, _iterator, _step, records, isAccommodationValid;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _tokenToData["default"])(req, res, next);

          case 2:
            decoded = _context.sent;
            _context.prev = 3;

            if (!decoded.manager_id) {
              _context.next = 33;
              break;
            }

            request = {
              managerId: decoded.manager_id,
              userId: decoded.id,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            counter = req.body.trip.length;
            _iterator = _createForOfIteratorHelper(req.body.trip);
            _context.prev = 8;

            _iterator.s();

          case 10:
            if ((_step = _iterator.n()).done) {
              _context.next = 23;
              break;
            }

            records = _step.value;
            counter -= 1;
            _context.next = 15;
            return (0, _isAccomodationExist["default"])(records.accommodationId, next);

          case 15:
            isAccommodationValid = _context.sent;

            if (isAccommodationValid) {
              _context.next = 20;
              break;
            }

            throw new _notFoundRequestError["default"]('Accommodation not found, try again');

          case 20:
            if (counter == 0) {
              (0, _createTravelRequest["default"])(req, res, request, next);
            }

          case 21:
            _context.next = 10;
            break;

          case 23:
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](8);

            _iterator.e(_context.t0);

          case 28:
            _context.prev = 28;

            _iterator.f();

            return _context.finish(28);

          case 31:
            _context.next = 34;
            break;

          case 33:
            throw new _badRequestError["default"]('You need a Manager First.', 400);

          case 34:
            _context.next = 39;
            break;

          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](3);
            next(_context.t1);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 36], [8, 25, 28, 31]]);
  }));

  return function travelRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.travelRequest = travelRequest;

var cancel_travelRequest = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, travelRequestId, action, decoded, userId, findTravelRequest, changes, updateStatus, newNotificantion, notification, mail;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, travelRequestId = _req$body.travelRequestId, action = _req$body.action;
            _context2.next = 3;
            return (0, _tokenToData["default"])(req, res, next);

          case 3:
            decoded = _context2.sent;
            _context2.prev = 4;

            if (!(action === 'cancel')) {
              _context2.next = 41;
              break;
            }

            userId = decoded.id;
            _context2.next = 9;
            return _directTravelRequest["default"].findItById({
              travelId: travelRequestId
            });

          case 9:
            findTravelRequest = _context2.sent;

            if (!findTravelRequest) {
              _context2.next = 38;
              break;
            }

            if (!(findTravelRequest.userId === userId)) {
              _context2.next = 35;
              break;
            }

            changes = 'canceled';

            if (!(findTravelRequest.status === 'pending')) {
              _context2.next = 32;
              break;
            }

            _context2.next = 16;
            return _directTravelRequest["default"].updateStatus({
              travelId: travelRequestId,
              status: {
                status: changes
              }
            });

          case 16:
            updateStatus = _context2.sent;

            if (!updateStatus) {
              _context2.next = 29;
              break;
            }

            newNotificantion = {
              user_id: userId,
              title: 'Cancel Travel Request',
              message: "You ".concat(req.body.action, "ed your travel request ")
            };
            _context2.next = 21;
            return _models["default"].Notification.create(newNotificantion);

          case 21:
            notification = _context2.sent;
            console.log(notification);

            _pusher["default"].trigger('bare-foot-normad', 'notification', notification);

            _context2.next = 26;
            return (0, _sendNotificationEmail.cancelTravelRequestEmail)(decoded.email, req.body.action);

          case 26:
            mail = _context2.sent;
            console.log(mail);
            return _context2.abrupt("return", res.status(201).json({
              status: 201,
              message: 'Travel request canceled successfully!'
            }));

          case 29:
            throw new _applicationError["default"]('Failed to cancel this travel request, try again!', 500);

          case 32:
            throw new _badRequestError["default"]("Can not cancel this travel request, because it is ".concat(findTravelRequest.status), 400);

          case 33:
            _context2.next = 36;
            break;

          case 35:
            throw new _applicationError["default"]('Not allowed to cancel this travel request', 403);

          case 36:
            _context2.next = 39;
            break;

          case 38:
            throw new _notFoundRequestError["default"]('The travel request does not exist!', 404);

          case 39:
            _context2.next = 42;
            break;

          case 41:
            throw new _badRequestError["default"]('Can not perform this operation!', 400);

          case 42:
            _context2.next = 47;
            break;

          case 44:
            _context2.prev = 44;
            _context2.t0 = _context2["catch"](4);
            next(_context2.t0);

          case 47:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 44]]);
  }));

  return function cancel_travelRequest(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.cancel_travelRequest = cancel_travelRequest;