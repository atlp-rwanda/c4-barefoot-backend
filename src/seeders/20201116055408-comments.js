module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TravelComments', [
      {
        commentId: '041f6104-799a-439a-b282-19f62c60849c',
        userId: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
        comment: 'Hello, how are you'
      },
      {
        commentId: 'e996c087-5bf5-4e19-8d65-7540a4a89da9',
        userId: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
        comment: 'Hello, again'
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TravelComments', null, {});
  }
};
