module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Chats', [{
      id: '60e2e163-eb27-4ae1-b5e2-66b95137dcac',
      sender: '2d647115-3af7-4df0-99aa-6656c764829f',
      receiver: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      message: 'Hello Dear!',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-11T19:27:12.390Z',
      updatedAt: '2021-01-01T12:07:12.717Z'
    },
    {
      id: 'c85daa45-f94a-479b-b5c8-ef898949c0a6',
      sender: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
      message: 'Good afternoon!',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-01T12:07:22.717Z',
      updatedAt: '2021-01-01T12:07:22.717Z'
    },
    {
      id: 'fd5f7d48-f7ac-4361-a1ce-807c679e6651',
      sender: '2d647115-3af7-4df0-99aa-6656c764829f',
      receiver: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      message: "I'm fine! How about we make a trip this first day ?",
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-01T12:07:42.717Z',
      updatedAt: '2021-01-01T12:07:42.717Z'
    },
    {
      id: '6dab0a62-b49b-4389-9ce3-3a651d0677fd',
      sender: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
      message: 'Sounds cool, let us get trippin to Cairo, How about it?',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:21:20.717Z',
      updatedAt: '2021-01-02T10:21:20.717Z'
    },
    {
      id: '7a7ce9e2-ce8a-4d76-9626-cfabf2009e42',
      sender: '2d647115-3af7-4df0-99aa-6656c764829f',
      receiver: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      message: 'https://media.istockphoto.com/photos/the-sphinx-of-giza-next-to-the-pyramids-in-the-desert-egypt-picture-id1146931869?b=1&k=6&m=1146931869&s=170667a&w=0&h=Ql1v-QA0uUtHXZldc2oqUZN3SToM-akLEOef-Jqr8h0=',
      type: 'image/jpeg',
      status: false,
      createdAt: '2021-01-02T10:21:24.717Z',
      updatedAt: '2021-01-02T10:21:24.717Z'
    },
    {
      id: 'bf78fac2-20ef-4dfb-bfeb-c475161c0402',
      sender: '2d647115-3af7-4df0-99aa-6656c764829f',
      receiver: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      message: 'Seriously? Going to the desert ? 🤣 I will not go to the desert.',
      type: 'plain-text',
      status: false,
      createdAt: '2021-01-02T10:22:20.717Z',
      updatedAt: '2021-01-02T10:22:20.717Z'
    },
    {
      id: '44a8cbe8-ed21-4c73-8f8c-097e1aad7aac',
      sender: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
      message: 'Hello dear Manager!',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:22.717Z',
      updatedAt: '2021-01-02T10:28:22.717Z'
    },
    {
      id: '98434750-ecad-459c-9b54-f18bf8c8656c',
      sender: '2d647115-3af7-4df0-99aa-6656c764829f',
      receiver: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      message: 'How can I help you ? 🙂',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:25.717Z',
      updatedAt: '2021-01-02T10:28:25.717Z'
    },
    {
      id: '5efb6fd8-d43a-41b5-b021-d6fe1536b88b',
      sender: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
      message: 'I need a recommendation for accomodation that has quite environment in Rwanda',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:26.717Z',
      updatedAt: '2021-01-02T10:28:26.717Z'
    },
    {
      id: 'b137ed3d-6da8-4c90-964e-5d12170e54e8',
      sender: '2d647115-3af7-4df0-99aa-6656c764829f',
      receiver: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      message: 'Great, there are a lot options indeed. I recommend those from Bugesera',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:27.717Z',
      updatedAt: '2021-01-02T10:28:27.717Z'
    },
    {
      id: '2830496d-65e3-4289-b6e9-819933637ca6',
      sender: '2d647115-3af7-4df0-99aa-6656c764829f',
      receiver: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      message: 'https://p.bookcdn.com/data/Photos/320x200/6567/656772/656772204/Bugesera-Lodge-photos-Exterior-Bugesera-Lodge.JPEG',
      type: 'image/jpeg',
      status: true,
      createdAt: '2021-01-02T10:28:27.717Z',
      updatedAt: '2021-01-02T10:28:27.717Z'
    },
    {
      id: 'fb4d4e4b-7e93-4116-ba53-59855be095e9',
      sender: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      receiver: '2d647115-3af7-4df0-99aa-6656c764829f',
      message: 'Thanks ☺. I will check them tomorrow!',
      type: 'plain-text',
      status: true,
      createdAt: '2021-01-02T10:28:28.717Z',
      updatedAt: '2021-01-02T10:28:28.717Z'
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chats', null, {});
  }
};
