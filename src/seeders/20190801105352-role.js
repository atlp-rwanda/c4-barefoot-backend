import roles from '../utils/roles';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      id: roles.REQUESTER,
      name: 'requester',
    },
    {
      id: roles.SUPER_ADMIN,
      name: 'super-admin',
    },
    {
      id: roles.MANAGER,
      name: 'manager',
    },
    {
      id: roles.TRAVEL_ADMIN,
      name: 'travel-admin',
    },
    {
      id: roles.TRAVEL_TEAM_MEMBER,
      name: 'travel-team-member',
    },
    {
      id: roles.ACCOMMODATION_SUPPLIER,
      name: 'accommodation-supplier',
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
