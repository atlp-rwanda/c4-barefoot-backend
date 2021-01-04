"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRoles = exports.updatePermissions = exports.getAllRoles = exports.createRole = exports.assignLineManager = exports.deleteOne = exports.updateUserRole = exports.findUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _users = _interopRequireDefault(require("../../services/users"));

var _applicationError = _interopRequireDefault(require("../../utils/Errors/applicationError"));

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

var _roles = _interopRequireDefault(require("../../services/roles"));

var _accessDenied = _interopRequireDefault(require("../../utils/Errors/accessDenied"));

var _readData = _interopRequireDefault(require("../../utils/readData"));

var findUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var page, limit, skip, users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            page = req.query.page || 1;
            limit = req.query.limit || 3;
            skip = page - 1 === -1 ? 0 : (page - 1) * limit; // find users using services

            _context.next = 6;
            return _users["default"].findUsers({
              offset: skip,
              limit: limit,
              attributes: ['id', 'first_name', 'last_name', 'username', 'bio', 'email', 'address', 'language', 'profile_picture', 'user_role_id', 'manager_id', 'verified']
            });

          case 6:
            users = _context.sent;

            if (!users) {
              _context.next = 11;
              break;
            }

            if (users.rows.length) {
              _context.next = 10;
              break;
            }

            throw new _notFoundRequestError["default"]("No user found on page ".concat(page));

          case 10:
            return _context.abrupt("return", res.status(200).json({
              status: 200,
              users: users
            }));

          case 11:
            throw new _applicationError["default"]('Failed to fetch users, try again!', 500);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function findUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.findUsers = findUsers;

var updateUserRole = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, email, role, roles, findUser, findRole, upDate;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, email = _req$body.email, role = _req$body.role;
            roles = _readData["default"].getPermissionsObject();
            /* check if role exist */

            if (roles.hasOwnProperty(role)) {
              _context2.next = 5;
              break;
            }

            throw new _notFoundRequestError["default"]('Role not exist!');

          case 5:
            if (!(role === 'administrator')) {
              _context2.next = 7;
              break;
            }

            throw new _accessDenied["default"]('Access denied!');

          case 7:
            _context2.next = 9;
            return _users["default"].getUser({
              email: email
            });

          case 9:
            findUser = _context2.sent;

            if (!(findUser && findUser.verified === true)) {
              _context2.next = 28;
              break;
            }

            _context2.next = 13;
            return _roles["default"].findRole({
              name: role
            });

          case 13:
            findRole = _context2.sent;

            if (!findRole) {
              _context2.next = 25;
              break;
            }

            _context2.next = 17;
            return _users["default"].updateUserRole({
              email: email,
              user_role_id: findRole.id
            });

          case 17:
            upDate = _context2.sent;

            if (!upDate) {
              _context2.next = 22;
              break;
            }

            res.status(201).json({
              status: 201,
              message: "The user role is updated to ".concat(role)
            });
            _context2.next = 23;
            break;

          case 22:
            throw new _applicationError["default"]('Failed to update this role, try again!', 500);

          case 23:
            _context2.next = 26;
            break;

          case 25:
            throw new _notFoundRequestError["default"]("".concat(role, " does not exist"));

          case 26:
            _context2.next = 29;
            break;

          case 28:
            throw new _notFoundRequestError["default"]("".concat(email, " does not exist or not verified!"));

          case 29:
            _context2.next = 34;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 31]]);
  }));

  return function updateUserRole(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateUserRole = updateUserRole;

var deleteOne = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var userEmail, findUser, deleted;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userEmail = req.body.email;
            _context3.next = 4;
            return _users["default"].getUser({
              email: userEmail
            });

          case 4:
            findUser = _context3.sent;

            if (!findUser) {
              _context3.next = 16;
              break;
            }

            _context3.next = 8;
            return _users["default"].deleteUser(userEmail);

          case 8:
            deleted = _context3.sent;

            if (!deleted) {
              _context3.next = 13;
              break;
            }

            res.status(200).json({
              status: 200,
              message: 'The user is deleted successfully!'
            });
            _context3.next = 14;
            break;

          case 13:
            throw new _applicationError["default"]('Failed to delete this user! Try again', 500);

          case 14:
            _context3.next = 17;
            break;

          case 16:
            throw new _notFoundRequestError["default"]("".concat(userEmail, " does not exist!"));

          case 17:
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function deleteOne(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteOne = deleteOne;

var assignLineManager = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$body2, email, manager_id, findUser, findRoleById, findManagerById, _findRoleById, updateUser;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, manager_id = _req$body2.manager_id;
            _context4.next = 4;
            return _users["default"].getUser({
              email: email
            });

          case 4:
            findUser = _context4.sent;

            if (!findUser) {
              _context4.next = 36;
              break;
            }

            _context4.next = 8;
            return _roles["default"].findRoleById({
              id: findUser.user_role_id
            });

          case 8:
            findRoleById = _context4.sent;

            if (!findRoleById) {
              _context4.next = 12;
              break;
            }

            if (!(findRoleById.name !== 'requester' && findRoleById.name !== 'manager')) {
              _context4.next = 12;
              break;
            }

            throw new _accessDenied["default"]("Cannot assign line manager to this user! ".concat(findRoleById.name), 403);

          case 12:
            _context4.next = 14;
            return _users["default"].findManagerById(manager_id);

          case 14:
            findManagerById = _context4.sent;

            if (!findManagerById) {
              _context4.next = 33;
              break;
            }

            _context4.next = 18;
            return _roles["default"].findRoleById({
              id: findManagerById.user_role_id
            });

          case 18:
            _findRoleById = _context4.sent;

            if (!(_findRoleById && _findRoleById.name === 'manager')) {
              _context4.next = 30;
              break;
            }

            _context4.next = 22;
            return _users["default"].updateUser({
              email: email,
              manager_id: manager_id
            });

          case 22:
            updateUser = _context4.sent;

            if (!updateUser) {
              _context4.next = 27;
              break;
            }

            res.status(201).json({
              status: 201,
              message: 'Line manager is assigned successfully'
            });
            _context4.next = 28;
            break;

          case 27:
            throw new _applicationError["default"]('Failed to assign this line manager, try again!');

          case 28:
            _context4.next = 31;
            break;

          case 30:
            throw new _notFoundRequestError["default"]('Line manager does not exist!');

          case 31:
            _context4.next = 34;
            break;

          case 33:
            throw new _notFoundRequestError["default"]('The line manager does not exist', 404);

          case 34:
            _context4.next = 37;
            break;

          case 36:
            throw new _notFoundRequestError["default"]('No user found!', 404);

          case 37:
            _context4.next = 42;
            break;

          case 39:
            _context4.prev = 39;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 42:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 39]]);
  }));

  return function assignLineManager(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
/* ------------------------------------------ROLES CONTROLLERS---------------------------*/


exports.assignLineManager = assignLineManager;

var createRole = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var Perm, requestData, roles, existProp, role, Roles, saveRole, dataJson;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            /* a constructor holding all permissions */
            Perm = function Perm() {
              this['edit profile'] = 1, this['assign requesters to manager'] = 0, this['create travel requests'] = 0, this['view travel requests'] = 0, this['edit travel requests'] = 0, this['cancel travel requests'] = 0, this['approve direct reports travel requests'] = 0, this['view direct reports travel requests'] = 0, this['reject direct reports travel requests'] = 0, this['view accommodations'] = 1, this['create accommodations'] = 0, this['update accommodations'] = 0, this['delete accommodations'] = 0, this['book accommodations'] = 0, this['view locations'] = 1, this['create locations'] = 0, this['update locations'] = 0, this['delete locations'] = 0;
            }; // import existing data in index.json


            /** receives the body object from the request */
            requestData = req.body;
            roles = _readData["default"].getPermissionsObject();
            existProp = false;
            /* check if index.json has this requested role */

            role = "".concat(requestData.role);

            if (!roles.hasOwnProperty(role)) {
              _context5.next = 9;
              break;
            }

            existProp = true;
            throw new _badRequestError["default"]('Role exist!');

          case 9:
            if (existProp) {
              _context5.next = 22;
              break;
            }

            /* a role object to add in db */
            Roles = {
              name: requestData.role,
              description: requestData.description
            };
            _context5.next = 13;
            return _roles["default"].createOne(Roles);

          case 13:
            saveRole = _context5.sent;

            if (!saveRole) {
              _context5.next = 21;
              break;
            }

            roles[role] = new Perm();
            /* convert this new JSON data from one line to readable using stringify */

            dataJson = JSON.stringify(roles, null, 2);

            _roles["default"].saveInFile(dataJson);

            res.status(201).json({
              status: 201,
              message: 'Role created successfully'
            });
            _context5.next = 22;
            break;

          case 21:
            throw new _applicationError["default"]('Failed to create this role, try again!', 500);

          case 22:
            _context5.next = 27;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 24]]);
  }));

  return function createRole(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.createRole = createRole;

var getAllRoles = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var allRoles;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _roles["default"].findRoles({});

          case 3:
            allRoles = _context6.sent;

            if (!allRoles) {
              _context6.next = 8;
              break;
            }

            if (allRoles.rows.length) {
              _context6.next = 7;
              break;
            }

            throw new _notFoundRequestError["default"]('No role found');

          case 7:
            return _context6.abrupt("return", res.status(200).json({
              status: 200,
              roles: allRoles
            }));

          case 8:
            throw new _applicationError["default"]('Failed to fetch roles, try again!', 500);

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 11]]);
  }));

  return function getAllRoles(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllRoles = getAllRoles;

var updatePermissions = function updatePermissions(req, res, next) {
  try {
    var requestData = req.body;

    var roles = _readData["default"].getPermissionsObject();

    var existProp = true;
    /* check if index.json does not have this requested role */

    var role = "".concat(requestData.role);

    if (!roles.hasOwnProperty(role)) {
      existProp = false;
      throw new _notFoundRequestError["default"]('Role not exist!');
    }

    if (existProp) {
      /* check if requested permissions are valid and values are valid */
      var permissions = requestData.permissions;
      var validPermission = [];

      for (var property in permissions) {
        if (roles[role].hasOwnProperty(property)) {
          if (permissions[property] === 0 || permissions[property] === 1) {
            /* a property from index.json is assigned a value from the request */
            roles[role][property] = permissions[property];
          } else {
            /* catch invalid property values (non 0 or 1 values) */
            validPermission.push(property);
          }
        } else {
          /* catch invalid properties */
          validPermission.push(property);
        }
      }

      var dataJson = JSON.stringify(roles, null, 2);
      /* save changes */

      _roles["default"].saveInFile(dataJson);

      if (validPermission != '') {
        throw new _badRequestError["default"]({
          message: 'These permissions or values are not allowed',
          'failed permissions': validPermission,
          success: roles[role]
        });
      } else {
        res.status(201).json({
          status: 201,
          message: 'Permissions updated successfully',
          'failed permissions': validPermission,
          success: roles[role]
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.updatePermissions = updatePermissions;

var deleteRoles = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var requestRole, roles, existProp, dataJson, findRole, changeRole, deletedRole;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            requestRole = req.body.role;
            roles = _readData["default"].getPermissionsObject();
            existProp = true;
            /* check if index.json does not have this requested role */

            if (roles.hasOwnProperty(requestRole)) {
              _context7.next = 7;
              break;
            }

            existProp = false;
            throw new _notFoundRequestError["default"]('Role not exist!');

          case 7:
            if (!(requestRole === 'administrator')) {
              _context7.next = 9;
              break;
            }

            throw new _accessDenied["default"]('Can not delete the administrator role!');

          case 9:
            if (!existProp) {
              _context7.next = 33;
              break;
            }

            if (!delete roles[requestRole]) {
              _context7.next = 32;
              break;
            }

            dataJson = JSON.stringify(roles, null, 2);
            _context7.next = 14;
            return _roles["default"].findRole({
              name: requestRole
            });

          case 14:
            findRole = _context7.sent;

            if (!findRole) {
              _context7.next = 29;
              break;
            }

            _context7.next = 18;
            return _roles["default"].changeRole({
              change: null,
              role_id: findRole.id
            });

          case 18:
            changeRole = _context7.sent;

            if (!changeRole) {
              _context7.next = 23;
              break;
            }

            _context7.next = 22;
            return _roles["default"].deleteOne(findRole.id);

          case 22:
            deletedRole = _context7.sent;

          case 23:
            if (!deletedRole) {
              _context7.next = 26;
              break;
            }

            /* save changes */
            _roles["default"].saveInFile(dataJson);

            return _context7.abrupt("return", res.status(200).json({
              status: 200,
              message: 'Role deleted successfully',
              role: requestRole
            }));

          case 26:
            throw new _applicationError["default"]('Failed to delete this role, try again!', 500);

          case 29:
            throw new _notFoundRequestError["default"]('Role not found!', 404);

          case 30:
            _context7.next = 33;
            break;

          case 32:
            throw new _applicationError["default"]('Failed to delete this role, try again!', 500);

          case 33:
            _context7.next = 38;
            break;

          case 35:
            _context7.prev = 35;
            _context7.t0 = _context7["catch"](0);
            next(_context7.t0);

          case 38:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 35]]);
  }));

  return function deleteRoles(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteRoles = deleteRoles;