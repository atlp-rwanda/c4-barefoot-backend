"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var updateProfileInputsValidation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var schema, _schema$validate, error;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schema = _joi["default"].object({
              first_name: _joi["default"].string().regex(/^[A-Za-z]+$/),
              last_name: _joi["default"].string().regex(/^[A-Za-z]+$/),
              username: _joi["default"].string().min(5),
              occupation: _joi["default"].string().min(4),
              bio: _joi["default"].string().min(0).allow('').allow(null),
              password: _joi["default"].string().min(8),
              address: _joi["default"].string(),
              language: _joi["default"].string().regex(/^[A-Za-z]+$/),
              profile_picture: _joi["default"].string()
            });
            _context.prev = 1;
            _schema$validate = schema.validate(req.body), error = _schema$validate.error;

            if (!error) {
              _context.next = 5;
              break;
            }

            throw new _notFoundRequestError["default"](error.details[0].message, 400);

          case 5:
            next();
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function updateProfileInputsValidation(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = updateProfileInputsValidation;
exports["default"] = _default;