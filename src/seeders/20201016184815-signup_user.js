module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Ineza',
      last_name: 'Bonte',
      email: 'inezabonte@gmail.com',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'image.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
