"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approve_reject_TravelRequest = exports.getDirectReport = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _travelRequestSearch = _interopRequireDefault(require("../services/travelRequestSearch"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _roles = _interopRequireDefault(require("../utils/roles"));

var _directTravelRequest = _interopRequireDefault(require("../services/directTravelRequest"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _applicationError = _interopRequireDefault(require("../utils/Errors/applicationError"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var _pusher = _interopRequireDefault(require("../config/pusher"));

var _models = _interopRequireDefault(require("../models"));

var _findUserById = _interopRequireDefault(require("../services/findUserById"));

var _sendNotificationEmail = require("../middlewares/sendNotificationEmail");

var getDirectReport = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var decoded, managerId, role, roleType, offset, limit, travelId, pagination, query, _query;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _tokenToData["default"])(req, res, next);

          case 2:
            decoded = _context.sent;

            try {
              managerId = decoded.id.toString();
              role = decoded.user_role_id;
              roleType = role === _roles["default"].MANAGER;
              offset = req.query.from;
              limit = req.query.to;
              travelId = req.params.travelId;
              pagination = {
                offset: offset,
                limit: limit
              };

              if (managerId && roleType) {
                if (travelId) {
                  query = {
                    managerId: managerId,
                    travelId: travelId
                  };
                  (0, _travelRequestSearch["default"])(res, query, next, pagination);
                } else {
                  _query = {
                    managerId: managerId
                  };
                  (0, _travelRequestSearch["default"])(res, _query, next, pagination);
                }
              } else {
                res.status(401).json({
                  message: 'you are not an approved manager'
                });
              }
            } catch (e) {
              next(e);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDirectReport(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getDirectReport = getDirectReport;

var approve_reject_TravelRequest = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, travelRequestId, action, decoded, _findTravelRequest, user, userId, changes, updateStatus, newNotificantion, notification, mail;

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

            if (!(action === 'approve' || action === 'reject')) {
              _context2.next = 42;
              break;
            }

            _context2.next = 8;
            return _directTravelRequest["default"].findItById({
              travelId: travelRequestId
            });

          case 8:
            _findTravelRequest = _context2.sent;
            _context2.next = 11;
            return (0, _findUserById["default"])(_findTravelRequest.userId);

          case 11:
            user = _context2.sent;

            if (!_findTravelRequest) {
              _context2.next = 39;
              break;
            }

            userId = decoded.id;

            if (!(_findTravelRequest.managerId === userId)) {
              _context2.next = 36;
              break;
            }

            if (!(_findTravelRequest.status === 'pending' || _findTravelRequest.status === 'rejected' && action !== 'reject')) {
              _context2.next = 33;
              break;
            }

            changes = action === 'approve' ? 'approved' : 'rejected';
            _context2.next = 19;
            return _directTravelRequest["default"].updateStatus({
              travelId: travelRequestId,
              status: {
                status: changes
              }
            });

          case 19:
            updateStatus = _context2.sent;

            if (!updateStatus) {
              _context2.next = 30;
              break;
            }

            //in-app notification and email notification
            newNotificantion = {
              user_id: user.id,
              title: "".concat(req.body.action, " Travel Request"),
              message: "Your travel request was ".concat(req.body.action, "d! ")
            };
            _context2.next = 24;
            return _models["default"].Notification.create(newNotificantion);

          case 24:
            notification = _context2.sent;

            _pusher["default"].trigger('bare-foot-normad', 'notification', notification);

            _context2.next = 28;
            return (0, _sendNotificationEmail.approveTravelRequestEmail)(user.email, req.body.action);

          case 28:
            mail = _context2.sent;
            return _context2.abrupt("return", res.status(201).json({
              status: 201,
              message: 'Operation performed successfully!'
            }));

          case 30:
            throw new _applicationError["default"]('Failed to approve this travel request, try again!', 500);

          case 33:
            throw new _badRequestError["default"]("The travel request is already ".concat(_findTravelRequest.status), 400);

          case 34:
            _context2.next = 37;
            break;

          case 36:
            throw new _applicationError["default"]('Failed to access this travel request!', 500);

          case 37:
            _context2.next = 40;
            break;

          case 39:
            throw new _notFoundRequestError["default"]('The travel request does not exist!', 404);

          case 40:
            _context2.next = 43;
            break;

          case 42:
            throw new _badRequestError["default"]('Can not perform this action', 400);

          case 43:
            _context2.next = 48;
            break;

          case 45:
            _context2.prev = 45;
            _context2.t0 = _context2["catch"](4);
            next(_context2.t0);

          case 48:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 45]]);
  }));

  return function approve_reject_TravelRequest(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.approve_reject_TravelRequest = approve_reject_TravelRequest;