<<<<<<< HEAD
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
=======
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
      LocationName: 'Kigali',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '81e37435-ce52-4cbd-8194-e65072f80497',
      LocationName: 'Kigali',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '3ea5caaf-e10f-45c3-9876-cd690fe27a32',
      LocationName: 'Kigali',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: 'a2bd68c2-39b4-4b61-9975-fc528052b3d4',
      LocationName: 'Kigali',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '6f54bcae-f476-4224-86c8-52b8bc4c9a3f',
      LocationName: 'Kamembe',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '13fd6ef0-5ddd-487f-8889-998945ad3b00',
      LocationName: 'Kamembe',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '5a06accb-c678-4b33-85d4-49183e8edc5a',
      LocationName: 'Nyamasheke',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: '42eb89ff-6fc6-4840-b9d6-80607348bc7e',
      LocationName: 'Ruhengeri',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    },
    {
      id: 'c7c0585e-91ff-4175-af96-07885ff32642',
      LocationName: 'Rwamagana',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://en.wikipedia.org/wiki/Kigali'
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})

};
>>>>>>> adds pusher
