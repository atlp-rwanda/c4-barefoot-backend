export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Locations', [
    {
      id: 'c6028e0d-ef88-4693-ab49-f37669891724',
      LocationName: 'Kigali',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '23fd8031-52d6-4150-958c-c162ba9e8f5c',
      LocationName: 'Musanze',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '81e37435-ce52-4cbd-8194-e65072f80497',
      LocationName: 'Ngara',
      country: 'Kenya',
      description: 'Umoja ndio utulivu mpya kwetu',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '3ea5caaf-e10f-45c3-9876-cd690fe27a32',
      LocationName: 'Kampala',
      country: 'Uganda',
      description: 'something to use when testing',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})

};
