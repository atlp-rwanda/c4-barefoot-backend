"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _roles = _interopRequireDefault(require("../utils/roles"));

var _default = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      id: _roles["default"].REQUESTER,
      name: 'requester'
    }, {
      id: _roles["default"].SUPER_ADMIN,
      name: 'administrator'
    }, {
      id: _roles["default"].MANAGER,
      name: 'manager'
    }, {
      id: _roles["default"].TRAVEL_ADMIN,
      name: 'travel-admin'
    }, {
      id: _roles["default"].TRAVEL_TEAM_MEMBER,
      name: 'travel-team-member'
    }, {
      id: _roles["default"].ACCOMMODATION_SUPPLIER,
      name: 'accommodation-supplier'
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
exports["default"] = _default;