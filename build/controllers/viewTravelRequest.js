"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editTravelRequest = exports.getTravelRequest = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _travelRequestSearch = _interopRequireDefault(require("../services/travelRequestSearch"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _directTravelRequest = _interopRequireDefault(require("../services/directTravelRequest"));

var _applicationError = _interopRequireDefault(require("../utils/Errors/applicationError"));

var getTravelRequest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var decoded, id, userid, offset, limit, pagination, query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _tokenToData["default"])(req, res, next);

          case 2:
            decoded = _context.sent;
            _context.prev = 3;
            id = req.params.requestId;
            userid = decoded.id.toString();
            offset = req.query.from;
            limit = req.query.to;
            pagination = {
              offset: offset,
              limit: limit
            };
            query = '';

            if (id) {
              // get a specific travel request
              query = {
                userId: userid,
                travelId: id
              };
            } else {
              // get all travel request
              query = {
                userId: userid
              };
            }

            (0, _travelRequestSearch["default"])(res, query, next, pagination);
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(401).json({
              message: 'session has expired, please login'
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function getTravelRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTravelRequest = getTravelRequest;

var editTravelRequest = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, tripId, updates, id, decoded, userId, findTravelRequests, findTrip, updateTrip, updateStatus;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, tripId = _req$body.tripId, updates = _req$body.updates;
            id = req.params.requestId;
            _context2.next = 4;
            return (0, _tokenToData["default"])(req, res, next);

          case 4:
            decoded = _context2.sent;
            _context2.prev = 5;
            userId = decoded.id;
            _context2.next = 9;
            return _directTravelRequest["default"].findItById({
              travelId: id
            });

          case 9:
            findTravelRequests = _context2.sent;

            if (!findTravelRequests) {
              _context2.next = 41;
              break;
            }

            if (!(findTravelRequests.userId === userId)) {
              _context2.next = 38;
              break;
            }

            if (!(findTravelRequests.status === 'pending' || findTravelRequests.status === 'rejected' || findTravelRequests.status === 'canceled')) {
              _context2.next = 35;
              break;
            }

            _context2.next = 15;
            return _directTravelRequest["default"].findTrip({
              travelId: id,
              tripId: tripId
            });

          case 15:
            findTrip = _context2.sent;

            if (!findTrip) {
              _context2.next = 32;
              break;
            }

            _context2.next = 19;
            return _directTravelRequest["default"].updateTrip({
              tripId: tripId,
              changes: updates
            });

          case 19:
            updateTrip = _context2.sent;

            if (!updateTrip) {
              _context2.next = 29;
              break;
            }

            _context2.next = 23;
            return _directTravelRequest["default"].updateStatus({
              status: {
                status: 'pending'
              },
              travelId: id
            });

          case 23:
            updateStatus = _context2.sent;

            if (!updateStatus) {
              _context2.next = 26;
              break;
            }

            return _context2.abrupt("return", res.status(201).json({
              status: 201,
              message: 'Trip updated successfully!'
            }));

          case 26:
            throw new _applicationError["default"]('Failed to update the status, try again!', 500);

          case 29:
            throw new _applicationError["default"]('Failed to update this trip, try again!', 500);

          case 30:
            _context2.next = 33;
            break;

          case 32:
            throw new _notFoundRequestError["default"]('Trip id not found', 404);

          case 33:
            _context2.next = 36;
            break;

          case 35:
            throw new _applicationError["default"]("Failed to update this trip, it is already ".concat(findTravelRequests.status), 500);

          case 36:
            _context2.next = 39;
            break;

          case 38:
            throw new _applicationError["default"]('Failed update this trip', 403);

          case 39:
            _context2.next = 42;
            break;

          case 41:
            throw new _notFoundRequestError["default"]('The travel request does not exist!', 404);

          case 42:
            _context2.next = 47;
            break;

          case 44:
            _context2.prev = 44;
            _context2.t0 = _context2["catch"](5);
            next(_context2.t0);

          case 47:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 44]]);
  }));

  return function editTravelRequest(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.editTravelRequest = editTravelRequest;