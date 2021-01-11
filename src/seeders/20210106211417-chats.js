module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Chats', [{
        uuid: '0ce36391-2c08-3074-bddb-a4ea8bbcbbc5',
        sender: '2d647115-3af7-4df0-99aa-6656c764829f',
        receiver: 'a9610cf3-4056-41dd-92ca-463088e23d07',
        message: 'Hello Dear!',
        createdAt: '2021-01-01 12:07:12.717+02',
        updatedAt: '2021-01-01 12:07:12.717+02',
        status: 'true'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4ea8bbcbba6',
        sender: 'a9610cf3-4056-41dd-92ca-463088e23d07',
        receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
        message: 'Good afternoon!',
        createdAt: '2021-01-01 12:07:22.717+02',
        updatedAt: '2021-01-01 12:07:22.717+02',
        status: 'true'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4ea8bbcbbc7',
        sender: '2d647115-3af7-4df0-99aa-6656c764829f',
        receiver: 'a9610cf3-4056-41dd-92ca-463088e23d07',
        message: "I'm fine! How about we make a trip this first day ?",
        createdAt: '2021-01-01 12:07:42.717+02',
        updatedAt: '2021-01-01 12:07:42.717+02',
        status: 'true'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4e78bbcbbc6',
        sender: 'a9610cf3-4056-41dd-92ca-463088e23d07',
        receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
        message: 'Sounds cool, let us get trippin to Cairo, How about it?',
        createdAt: '2021-01-02 10:28:20.717+02',
        updatedAt: '2021-01-02 10:28:20.717+02',
        status: 'false'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4eacbbcbbc6',
        sender: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
        message: 'Hello dear Manager!',
        createdAt: '2021-01-02 10:28:22.717+02',
        updatedAt: '2021-01-02 10:28:22.717+02',
        status: 'true'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4ea8bacbbc6',
        sender: '2d647115-3af7-4df0-99aa-6656c764829f',
        receiver: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        message: 'How can I help you ?',
        createdAt: '2021-01-02 10:28:25.717+02',
        updatedAt: '2021-01-02 10:28:25.717+02',
        status: 'true'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4ea8b3cbbc6',
        sender: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
        message: 'I need a recommendation for accomodation that has quite environment in Rwanda',
        createdAt: '2021-01-02 10:28:26.717+02',
        updatedAt: '2021-01-02 10:28:26.717+02',
        status: 'true'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4ea8bbcbdc6',
        sender: '2d647115-3af7-4df0-99aa-6656c764829f',
        receiver: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        message: 'Great, there are a lot options indeed. I recommend those from Bugesera',
        createdAt: '2021-01-02 10:28:27.717+02',
        updatedAt: '2021-01-02 10:28:27.717+02',
        status: 'true'
      },
      {
        uuid: '0ce36391-2c08-3074-bddb-a4ea8bbcbbc6',
        sender: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
        message: 'Thanks. I will check them tomorrow!',
        createdAt: '2021-01-02 10:28:28.717+02',
        updatedAt: '2021-01-02 10:28:28.717+02',
        status: 'true'
      }]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Chats', null, {});
    }
  };
  