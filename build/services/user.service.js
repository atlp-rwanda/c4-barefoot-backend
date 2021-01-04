"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../models"));

var User = _models["default"].User;
/**
 * different methods on User method
 */

var UserService = /*#__PURE__*/function () {
  /**
   * @param {int} user contains model properties
   */
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
    this.user = User;
  }
  /**
  * @param {object} options include total pages, total records,etc ... for pagination
  * @return {object} list of all users
  */


  (0, _createClass2["default"])(UserService, [{
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.user.paginate(options));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAllUsers(_x) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
    /**
    * @param {int} userId add user first name.
    * @return {object} get user with provided Id
    */

  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.user.findOne({
                  where: {
                    id: userId
                  }
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserById(_x2) {
        return _getUserById.apply(this, arguments);
      }

      return getUserById;
    }()
    /**
    * @param {string} username add username.
    * @return {object} get user with provided Id
    */

  }, {
    key: "getUserByUserName",
    value: function () {
      var _getUserByUserName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(username) {
        var query;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = {
                  attributes: ["id", "first_name", "last_name", "username", "bio", "occupation", "email", "address", "language", "profile_picture", "user_role_id", "manager_id", "verified", "refreshtoken"],
                  where: {
                    username: username
                  }
                };
                return _context3.abrupt("return", this.user.findOne(query));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUserByUserName(_x3) {
        return _getUserByUserName.apply(this, arguments);
      }

      return getUserByUserName;
    }()
    /**
    * @param {string} email add email.
    * @return {object} get user with provided email
    */

  }, {
    key: "getUserByEmail",
    value: function () {
      var _getUserByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(email) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.user.findOne({
                  where: {
                    email: email
                  }
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getUserByEmail(_x4) {
        return _getUserByEmail.apply(this, arguments);
      }

      return getUserByEmail;
    }()
    /**
     * @param {object} data include different rows properties
     * @param {string} username add username.
     * @return {string} success message
     */

  }, {
    key: "updateUserByUsername",
    value: function () {
      var _updateUserByUsername = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data, username) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.user.update(data, {
                  where: {
                    username: username
                  }
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateUserByUsername(_x5, _x6) {
        return _updateUserByUsername.apply(this, arguments);
      }

      return updateUserByUsername;
    }()
  }]);
  return UserService;
}();

var _default = new UserService();

exports["default"] = _default;