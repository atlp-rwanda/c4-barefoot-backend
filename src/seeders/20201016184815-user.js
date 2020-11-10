import { hashPassword } from '../utils/auth';
import roles from '../utils/roles';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
      first_name: 'Line',
      last_name: 'Manager',
      username: 'manager_id',
      address: 'Kigali',
      language: 'English',
      email: 'manager_id@gmail.com',
      password: hashPassword('manager_id'),
      verified: true,
      user_role_id: roles.MANAGER,
    },
    {
      id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
      first_name: 'SUper',
      last_name: 'Admin',
      username: 'superadmin',
      address: 'Kigali',
      language: 'English',
      email: 'superadmin@gmail.com',
      password: hashPassword('Superadmin'),
      verified: true,
      user_role_id: roles.SUPER_ADMIN
    },
    {
      id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
      first_name: 'Manager',
      last_name: 'Two',
      email: 'managertwo@gmail.com',
      password: hashPassword('manaager2'),
      verified: true,
      username: 'managertwo',
      address: 'Kigali',
      language: 'English',
      user_role_id: roles.MANAGER,
      manager_id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5'
    }, {
      id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
      first_name: 'Manager',
      last_name: 'One',
      email: 'mj@gmail.com',
      password: hashPassword('manager1'),
      verified: false,
      username: 'managerOne',
      address: 'Kigali',
      language: 'English',
      user_role_id: roles.MANAGER,
      manager_id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
    }, {
      id: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      first_name: 'Requester',
      last_name: 'One',
      username: 'requesterOne',
      email: 'sequester@gmail.com',
      password: hashPassword('password'),
      manager_id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
      user_role_id: roles.REQUESTER,
      address: 'Kigali',
      language: 'English',
      verified: true
    },

  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
