"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = require("../utils/auth");

var _roles = _interopRequireDefault(require("../utils/roles"));

var _default = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
      first_name: 'Line',
      last_name: 'Manager',
      username: 'manager_id',
      occupation: 'manager_occupation',
      address: 'Kigali',
      language: 'English',
      email: 'manager_id@gmail.com',
      password: (0, _auth.hashPassword)('manager_id'),
      verified: true,
      user_role_id: _roles["default"].MANAGER
    }, {
      id: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      first_name: 'Manager',
      last_name: 'Manager',
      username: 'With_LineManager',
      occupation: 'manager_occupation',
      address: 'Kigali',
      language: 'English',
      email: 'With_LineManager@gmail.com',
      password: (0, _auth.hashPassword)('With_LineManager'),
      verified: true,
      user_role_id: _roles["default"].MANAGER,
      manager_id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8'
    }, {
      id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
      first_name: 'SUper',
      last_name: 'Admin',
      username: 'superadmin',
      occupation: 'admin_occupation',
      address: 'Kigali',
      language: 'English',
      email: 'superadmin@gmail.com',
      password: (0, _auth.hashPassword)('Superadmin'),
      verified: true,
      user_role_id: _roles["default"].SUPER_ADMIN
    }, {
      id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
      first_name: 'Manager',
      last_name: 'Two',
      email: 'managertwo@gmail.com',
      password: (0, _auth.hashPassword)('manaager2'),
      verified: true,
      username: 'managertwo',
      occupation: 'manager_occupation',
      address: 'Kigali',
      language: 'English',
      user_role_id: _roles["default"].MANAGER,
      manager_id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5'
    }, {
      id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
      first_name: 'Manager',
      last_name: 'One',
      email: 'mj@gmail.com',
      password: (0, _auth.hashPassword)('manager1'),
      verified: true,
      username: 'managerOne',
      occupation: 'manager_occupation',
      address: 'Kigali',
      language: 'English',
      user_role_id: _roles["default"].MANAGER,
      manager_id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8'
    }, {
      id: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      first_name: 'Requester',
      last_name: 'One',
      username: 'requesterOne',
      occupation: 'requester_occupation',
      email: 'sequester@gmail.com',
      password: (0, _auth.hashPassword)('password'),
      manager_id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
      user_role_id: _roles["default"].REQUESTER,
      address: 'Kigali',
      language: 'English',
      verified: true
    }, {
      id: '2d647115-3af7-4df0-99aa-6656c764829f',
      first_name: 'Travel',
      last_name: 'Admin',
      username: 'travelAdmin',
      occupation: 'travelAdmin_occupation',
      email: 'traveladmin@gmail.com',
      password: (0, _auth.hashPassword)('password'),
      user_role_id: _roles["default"].TRAVEL_ADMIN,
      address: 'Kigali',
      language: 'English',
      verified: true
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
exports["default"] = _default;