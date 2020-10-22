const { date } = require("joi");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      first_name: 'Ineza',
      last_name: 'Bonte',
      occupation: 'software devlopment',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'image.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
