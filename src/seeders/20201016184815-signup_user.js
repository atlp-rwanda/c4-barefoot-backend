module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'TestName',
      last_name: 'TestName',
      email: 'renedeolynda@gmail.com',
      username: 'TestName1212',
      occupation: 'TestName1212',
      password: 'pa13332335',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'image.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
