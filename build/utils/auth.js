"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.hashPassword = exports.verifyResetPasswordToken = exports.verifyToken = exports.comparePassword = exports.generateToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

require("dotenv/config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var salt = _bcrypt["default"].genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));

var secret = process.env.TOKEN_SECRET;
/**
   * Generate JWT
   * @param {Object} payload - object literal resource to be encoded
   * @param {String} expiresIn jwt expiry date
   * @returns {String} - jwt token
   */

var generateToken = function generateToken(payload) {
  var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '7d';

  var token = _jsonwebtoken["default"].sign(_objectSpread({}, payload), secret, {
    expiresIn: expiresIn
  });

  return token;
};

exports.generateToken = generateToken;

var comparePassword = function comparePassword(password, userPassword) {
  var result = _bcrypt["default"].compareSync(password, userPassword);

  return result;
};
/**
 * @function verifyToken
 * @param {String} token jwt token
 * @returns {Object} decoded object
 */


exports.comparePassword = comparePassword;

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);

          case 2:
            decoded = _context.sent;
            return _context.abrupt("return", decoded);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var verifyResetPasswordToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
    var decoded;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET, function (error) {
              if (error) {
                return {
                  messages: 'your token exired '
                };
              }
            });

          case 2:
            decoded = _context2.sent;
            return _context2.abrupt("return", decoded);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verifyResetPasswordToken(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @function hashPassword
 * @param {String} password pasword string to be hashed
 * @returns {String} hashed password
 * @description takes a raw password string, hashes it and returns the hasshed value
 */


exports.verifyResetPasswordToken = verifyResetPasswordToken;

var hashPassword = function hashPassword(password) {
  return _bcrypt["default"].hashSync(password, salt);
};

exports.hashPassword = hashPassword;
var _default = {
  generateToken: generateToken,
  verifyResetPasswordToken: verifyResetPasswordToken
};
exports["default"] = _default;