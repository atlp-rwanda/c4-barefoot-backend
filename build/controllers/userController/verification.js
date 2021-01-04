"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

var _user = _interopRequireDefault(require("../../services/user.service"));

var verification = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var updateUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            updateUser = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
                var record, data;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user["default"].getUserByUserName(user);

                      case 3:
                        record = _context.sent;

                        if (record) {
                          _context.next = 6;
                          break;
                        }

                        throw new _notFoundRequestError["default"]('Account does not exist');

                      case 6:
                        if (!(record.verified === false)) {
                          _context.next = 10;
                          break;
                        }

                        data = {
                          verified: true
                        };

                        _user["default"].updateUserByUsername(data, user);

                        return _context.abrupt("return", res.status(200).json({
                          status: 200,
                          message: 'Email has been verified'
                        }));

                      case 10:
                        throw new _badRequestError["default"]('Account already verified');

                      case 13:
                        _context.prev = 13;
                        _context.t0 = _context["catch"](0);
                        next(_context.t0);

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[0, 13]]);
              }));

              return function updateUser(_x4) {
                return _ref2.apply(this, arguments);
              };
            }();

            _jsonwebtoken["default"].verify(req.query.token, process.env.TOKEN_SECRET, function (err, user) {
              if (err) throw new _badRequestError["default"]('Invalid token');
              updateUser(user.username);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verification(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verification;
exports["default"] = _default;