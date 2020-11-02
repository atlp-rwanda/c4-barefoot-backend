const { date } = require("joi");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      first_name: 'Mugabo',
      last_name: 'Deo',
      username: 'mdeo1',
      occupation: 'software devlopment',
      email: 'mdeo@gmail.com',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'image.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
