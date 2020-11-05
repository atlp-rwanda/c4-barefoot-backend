module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Mugabo',
      last_name: 'Deo',
      username: 'Mdeo12',
      occupation: 'software devlopment',
      email: 'mdeo@gmail.com',
      password: 'pass123',
      address: 'Nairobi',
      language: 'French',
      profile_picture: 'image.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
