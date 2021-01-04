"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _roles = _interopRequireDefault(require("../utils/roles"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.createTable('Users', {
                id: {
                  allowNull: false,
                  "default": Sequelize.fn('uuid_generate_v4'),
                  primaryKey: true,
                  type: Sequelize.UUID
                },
                first_name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                last_name: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                email: {
                  allowNull: false,
                  unique: true,
                  type: Sequelize.STRING
                },
                password: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                username: {
                  allowNull: false,
                  type: Sequelize.STRING,
                  unique: true
                },
                occupation: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                bio: {
                  allowNull: true,
                  type: Sequelize.STRING
                },
                profile_picture: {
                  allowNull: true,
                  type: Sequelize.STRING,
                  defaultValue: 'https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg'
                },
                manager_id: {
                  allowNull: true,
                  type: Sequelize.UUID,
                  references: {
                    model: 'Users',
                    key: 'id'
                  }
                },
                language: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  defaultValue: 'English'
                },
                address: {
                  type: Sequelize.STRING,
                  allowNull: false
                },
                user_role_id: {
                  allowNull: true,
                  type: Sequelize.UUID,
                  defaultValue: _roles["default"].REQUESTER,
                  references: {
                    model: 'Roles',
                    key: 'id'
                  }
                },
                refreshtoken: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  defaultValue: 'refreshtoken'
                },
                verified: {
                  allowNull: true,
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
                },
                createdAt: {
                  allowNull: true,
                  type: Sequelize.DATE,
                  defaultValue: Sequelize.fn('NOW')
                },
                updatedAt: {
                  allowNull: true,
                  type: Sequelize.DATE,
                  defaultValue: Sequelize.fn('NOW')
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.dropTable('Users');

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};