import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      first_name: 'Ineza',
      last_name: 'Bonte',
      username: `${uuidv4()}`,
      occupation: 'software development',
      email: 'inezabonte@gmail.com',
      password: 'passPass123',
      address: 'Nairobi',
      language: 'French',
      profile_picture: 'image.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
