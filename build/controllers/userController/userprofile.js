"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.getUserProfile = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../services/user.service"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

var _applicationError = _interopRequireDefault(require("../../utils/Errors/applicationError"));

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var _authorizationError = _interopRequireDefault(require("../../utils/Errors/authorizationError"));

// get a user profile with either Id or first_name
var getUserProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var username, record;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            username = req.params.username;

            if (username) {
              _context.next = 4;
              break;
            }

            throw new _badRequestError["default"]('invalid URI', 400);

          case 4:
            _context.next = 6;
            return _user["default"].getUserByUserName(username);

          case 6:
            record = _context.sent;

            if (record) {
              _context.next = 9;
              break;
            }

            throw new _notFoundRequestError["default"]('user not found', 404);

          case 9:
            res.status(200).json({
              status: 200,
              message: 'successful got user profile',
              data: record
            });
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function getUserProfile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // update a single user profile


exports.getUserProfile = getUserProfile;

var updateUserProfile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var username, record;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (res.locals.token) {
              _context2.next = 3;
              break;
            }

            throw new _applicationError["default"]('unable to obtain a payload in token', 500);

          case 3:
            username = res.locals.token;
            _context2.next = 6;
            return _user["default"].getUserByUserName(username);

          case 6:
            record = _context2.sent;

            if (record) {
              _context2.next = 9;
              break;
            }

            throw new _notFoundRequestError["default"]('user not found', 404);

          case 9:
            if (!(record.dataValues.username !== username)) {
              _context2.next = 11;
              break;
            }

            throw new _authorizationError["default"]('owner of profile does not match signed in user', 401);

          case 11:
            _user["default"].updateUserByUsername(req.body, username);

            res.status(200).json({
              status: 200,
              message: 'successfully updated your profile'
            });
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function updateUserProfile(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateUserProfile = updateUserProfile;