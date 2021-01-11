module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('ChatVs', [{
        id: '0ce36391-2c08-3074-bddb-a4ea8bbcbba6',
        visitor: 'visitor@yahoo.com',
        message: 'Hello Here!',
        sender: 'visitor@yahoo.com',
        status: true,
        createdAt: '2021-01-01 12:07:22.717+02',
        updatedAt: '2021-01-01 12:07:22.717+02'
      },
      {
        id: '0ce36391-2c08-3074-bddb-a4ea8bbcbbc7',
        visitor: 'visitor@yahoo.com',
        message: 'Yes Dear, How can we help you?',
        sender: 'superadmin@gmail.com',
        status: true,
        createdAt: '2021-01-01 12:07:42.717+02',
        updatedAt: '2021-01-01 12:07:42.717+02',
      },
      {
        id: '0ce36391-2c08-3074-bddb-a4e78bbcbbc6',
        visitor: 'visitor@yahoo.com',
        message: 'Do you have accomodations in Nigeria ?',
        sender: 'visitor@yahoo.com',
        status: true,
        createdAt: '2021-01-02 10:28:20.717+02',
        updatedAt: '2021-01-02 10:28:20.717+02'
      },
      {
        id: '0ce36391-2c08-3074-bddb-a4eacbbcbbc6',
        visitor: 'visitor@yahoo.com',
        message: 'Since January 2021, We have been able to accomodate 50 people in our system and the number is expected to increase gradually by the end of this year.',
        sender: 'traveladmin@gmail.com',
        status: true,
        createdAt: '2021-01-02 10:28:22.717+02',
        updatedAt: '2021-01-02 10:28:22.717+02'
      },
      {
        id: '0ce36391-2c08-3074-bddb-a4ea8bacbbc6',
        visitor: 'visitor@yahoo.com',
        message: 'Great! Now help me to signup with my yahoo. I do not see `Signin with Yahoo`. Am I not eligible here ?',
        sender: 'visitor@yahoo.com',
        status: true,
        createdAt: '2021-01-02 10:28:25.717+02',
        updatedAt: '2021-01-02 10:28:25.717+02'
      },
      {
        id: '0ce36391-2c08-3074-bddb-a4ea8b3cbbc6',
        visitor: 'visitor@yahoo.com',
        message: 'Currently we allow signup with Google, Facebook and the traditional signup. Since we do not have the yahoo signup/signin provide, please SignUp with the traditional option.',
        sender: 'superadmin@gmail.com',
        status: false,
        createdAt: '2021-01-02 10:28:26.717+02',
        updatedAt: '2021-01-02 10:28:26.717+02'
      },
      {
        id: '0ce36391-2c08-3074-bddb-a4ea8bbcbdc6',
        visitor: 'otherVisitor@gmail.com',
        message: 'Hello Support!',
        sender: 'otherVisitor@gmail.com',
        status: true,
        createdAt: '2021-01-02 10:28:27.717+02',
        updatedAt: '2021-01-02 10:28:27.717+02'
      },
      {
        id: '0ce36391-2f08-3074-bddb-a4ea8bbcbdc6',
        visitor: 'otherVisitor@gmail.com',
        message: 'Yes dear, how can we help you today ?',
        sender: 'superadmin@gmail.com',
        status: true,
        createdAt: '2021-01-02 10:29:27.717+02',
        updatedAt: '2021-01-02 10:29:27.717+02'
      },
      {
        id: '0ce36391-2d08-3074-bddb-a4ea8bbcbdc6',
        visitor: 'otherVisitor@gmail.com',
        message: 'My iPhone 11 Pro is not working :\'(',
        sender: 'otherVisitor@gmail.com',
        status: false,
        createdAt: '2021-01-02 10:39:27.717+02',
        updatedAt: '2021-01-02 10:39:27.717+02'
      }]);
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('ChatVs', null, {});
    }
  };
  