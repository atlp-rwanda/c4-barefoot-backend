module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ChatVs', [{
      id: '916ae5eb-2022-4d42-a859-19f6e557d4eb',
      sender: 'visitor@yahoo.com',
      receiver: 'visitor@yahoo.com',
      message: 'Hello Here!',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-01T12:07:22.717Z',
      updatedAt: '2021-01-01T12:07:22.717Z'
    },
    {
      id: 'f8f7ceec-5222-46ae-bd06-677ef7b0c0e6',
      receiver: 'visitor@yahoo.com',
      sender: 'superadmin@gmail.com',
      message: 'Yes Dear, How can we help you?',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-01T12:07:42.717Z',
      updatedAt: '2021-01-01T12:07:42.717Z',
    },
    {
      id: 'd1ebb771-88fd-4543-9055-852abda33ce4',
      receiver: 'support-team',
      sender: 'visitor@yahoo.com',
      message: 'Do you have accomodations in Nigeria ?',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:20.717Z',
      updatedAt: '2021-01-02T10:28:20.717Z'
    },
    {
      id: '7865a19c-27a7-4a78-bea6-9f806f6dc45c',
      receiver: 'visitor@yahoo.com',
      sender: 'traveladmin@gmail.com',
      message: 'Since January 2021, We have been able to accomodate 50 people in our system and the number is expected to increase gradually by the end of this year. You can refer to the PDF below',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:22.717Z',
      updatedAt: '2021-01-02T10:28:22.717Z'
    },
    {
      id: '147a12ce-d89b-45f1-ae1f-d1de6b9da416',
      receiver: 'visitor@yahoo.com',
      sender: 'traveladmin@gmail.com',
      message: 'https://www.unicode.org/L2/L2015/15140-utr51-2d9.pdf',
      type: 'application/pdf',
      status: true,
      createdAt: '2021-01-02T10:28:22.717Z',
      updatedAt: '2021-01-02T10:28:22.717Z'
    },
    {
      id: '6f33c2ef-4cdd-4dd4-aedc-daa00d9dcd4c',
      receiver: 'support-team',
      sender: 'visitor@yahoo.com',
      message: 'Great! Now help me to signup with my yahoo. I do not see `Signin with Yahoo`. Am I not eligible here ?',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:25.717Z',
      updatedAt: '2021-01-02T10:28:25.717Z'
    },
    {
      id: '5d75e557-10d3-497c-9a72-bee2196b4b64',
      receiver: 'visitor@yahoo.com',
      sender: 'superadmin@gmail.com',
      message: 'Currently we allow signup with Google, Facebook and the traditional signup. Since we do not have the yahoo signup/signin provide, please SignUp with the traditional option.',
      type: 'plain-text',
      status: false,
      createdAt: '2021-01-02T10:28:26.717Z',
      updatedAt: '2021-01-02T10:28:26.717Z'
    },
    {
      id: '69f4d340-ccfd-4ad5-85cd-90588a4454f2',
      receiver: 'support-team',
      sender: 'otherVisitor@gmail.com',
      message: 'Hello Support!',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:27.717Z',
      updatedAt: '2021-01-02T10:28:27.717Z'
    },
    {
      id: '03c22ce1-000f-4281-91a0-d9280b4acb47',
      receiver: 'otherVisitor@gmail.com',
      sender: 'superadmin@gmail.com',
      message: 'Yes dear, how can we help you today ?',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:29:27.717Z',
      updatedAt: '2021-01-02T10:29:27.717Z'
    },
    {
      id: '2391257e-be0c-4ccb-ab52-65e5e88dfb7b',
      receiver: 'support-team',
      sender: 'otherVisitor@gmail.com',
      message: 'My iPhone 11 Pro is not working 😭',
      type: 'plain-text',
      status: false,
      createdAt: '2021-01-02T10:39:27.717Z',
      updatedAt: '2021-01-02T10:39:27.717Z'
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ChatVs', null, {});
  }
};
