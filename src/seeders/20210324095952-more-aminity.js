export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Amenities', [
    {
      id: '074f8272-4502-4a23-9842-3333f667d4f0',
      accommodationId: '05416ea7-db39-4bcd-a63a-112604d9e1fa',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '2a16d2aa-4f77-4f12-bb45-fcc91fdc0da7',
      accommodationId: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '43af9b23-067d-4ea7-8bdf-91564c481c65',
      accommodationId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '48f0a358-488e-4675-bc03-56204c8c9833',
      accommodationId: '28debeec-6adc-4dbe-a3c0-d3480c49ee76',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '642239c8-9c48-4b21-8abb-853167968a5d',
      accommodationId: '2d647115-3af7-4df0-99aa-6656c764829f',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '86dd3f3a-8b84-4f5d-916a-2f1bb2acfd1d',
      accommodationId: '4d5b1b29-51e4-4db5-8b99-57fd76bd5544',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '878347a2-b429-462d-b8f2-e06ba7e3d4a2',
      accommodationId: 'acd0c92d-c8b8-409f-b1f1-c2d95d0758a1',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '8c34a8e4-e858-4e19-8d2c-b5307f7d7ec8',
      accommodationId: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '92de9f47-85a5-49b1-a284-59439340c077',
      accommodationId: 'a9610cf3-4056-41dd-92ca-463088e23d07',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '94340c49-0cce-4b8f-adec-361eb789e974',
      accommodationId: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: '963c204d-389f-40e9-8eb6-a582c1822e76',
      accommodationId: '2830496d-65e3-4289-b6e9-819933637ca6',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: 'a96aae56-32b5-4f09-b7b9-0b8be1c84a69',
      accommodationId: '44a8cbe8-ed21-4c73-8f8c-097e1aad7aac',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: 'ad1a03e1-309d-4928-9300-af3b3c14b0d0',
      accommodationId: '5efb6fd8-d43a-41b5-b021-d6fe1536b88b',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: 'c6b4ee49-621c-44cd-88be-93c6a4c285fc',
      accommodationId: '60e2e163-eb27-4ae1-b5e2-66b95137dcac',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    },
    {
      id: 'c6e1a5d8-1b13-45e1-967e-ed2c8c5f0db2',
      accommodationId: '7a7ce9e2-ce8a-4d76-9626-cfabf2009e42',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Amenities', null, {})

};
