<<<<<<< HEAD
export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Accommodation', [
    {
      id: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      country: 'Rwanda',
      city: 'Kigali',
      state: 'Nyarugenge',
      streetAddress: 'KN 22 ST',
      locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
      propertyType: 'Hostel',
      numberOfRooms: 100,
      typeOfBed: 'Double Decker',
      title: 'Nyarugenge hotel',
      description: 'A serene environment for relaxation',
      photos: 'https://cf.bstatic.com/xdata/images/hotel/270x200/173239978.jpg?k=ad6925a1724ff30c587bab826b1da6ac4eeb055c21b368d6ca3d1921766e1e2b&o='
    },
    {
      id: '520f2b37-7bac-4490-aa7a-96f15915bcd7',
      country: 'Rwanda',
      city: 'Kigali',
      state: 'Kigali',
      streetAddress: 'KN 22 ST',
      locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
      propertyType: 'Hostel',
      numberOfRooms: 500,
      typeOfBed: 'Double Decker',
      title: 'Kicukiro resots',
      description: 'A serene environment for relaxation',
      photos: 'https://yellowzebrasafaris.com/media/38724/pool-loungers-the-retreat-kigali-rwanda.jpg?anchor=center&mode=crop&width=2048&height=1024&format=jpg&rnd=131871981880000000'
    },
    {
      id: '1254d75c-8d88-4813-a234-b7edea461aa3',
      country: 'Rwanda',
      city: 'Musanze',
      state: 'Downtown',
      streetAddress: 'KN 22 ST',
      locationID: '23fd8031-52d6-4150-958c-c162ba9e8f5c',
      propertyType: 'Hostel',
      numberOfRooms: 100,
      typeOfBed: 'Double Decker',
      title: 'Student hostels',
      description: 'A serene environment for relaxation',
      photos: 'https://www.gorillashotels.com/IMG/rubon6.jpg'
    },
    {
      id: 'd659e75b-0d6f-4253-b3cc-3a1d402b64f5',
      country: 'Rwanda',
      city: 'Musanze',
      state: 'Up hills',
      streetAddress: 'KN 22 ST',
      locationID: '23fd8031-52d6-4150-958c-c162ba9e8f5c',
      propertyType: 'Hostel',
      numberOfRooms: 100,
      typeOfBed: 'Double Decker',
      title: 'Musanze political resots',
      description: 'A serene environment for relaxation',
      photos: 'https://lh3.googleusercontent.com/proxy/k6XVeEROdqZ1LXqJw2IyiuERvv_3mAY5MHAxuwMDTE8Mq_aZbSSU9Zio1fpFnZMhWYy3T8MhwBSOjD6QV6qh4wsBQ_oHAJgsxGiRWyHI_ZIEUcyRtdUtth8rrmNPNw'
    },
    {
      id: 'fbc8f4a8-bca2-4ae0-87bc-2408fb1872a7',
      country: 'Kenya',
      city: 'Nairobi',
      state: 'Ngara side',
      streetAddress: 'KN 22 ST',
      locationID: '81e37435-ce52-4cbd-8194-e65072f80497',
      propertyType: 'Hostel',
      numberOfRooms: 10,
      typeOfBed: 'Double Decker',
      title: 'Lelo hostels',
      description: 'A serene environment for relaxation',
      photos: 'https://cf.bstatic.com/images/hotel/max1280x900/277/277241428.jpg'
    },
    {
      id: '99cd2fd4-6287-4b4e-bb84-c87b6a66d02b',
      country: 'Kenya',
      city: 'Meru county',
      state: 'Wanyenye',
      streetAddress: 'KN 22 ST',
      locationID: '81e37435-ce52-4cbd-8194-e65072f80497',
      propertyType: 'Hostel',
      numberOfRooms: 10,
      typeOfBed: 'Double Decker',
      title: 'Meru girls hostels',
      description: 'A serene environment for relaxation',
      photos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFLwqWS0Wu1-3CDjIQptBgGlbH8nSzqSiJA&usqp=CAU'
    },
    {
      id: '35d19e5c-a6f6-4b58-9de5-479a1f3f301e',
      country: 'Uganda',
      city: 'Kampala',
      state: 'Wanyenye',
      streetAddress: 'KN 22 ST',
      locationID: '3ea5caaf-e10f-45c3-9876-cd690fe27a32',
      propertyType: 'Hostel',
      numberOfRooms: 10,
      typeOfBed: 'Double Decker',
      title: 'Kampala girls hostels',
      description: 'A serene environment for relaxation',
      photos: 'https://media-cdn.tripadvisor.com/media/photo-s/02/25/e6/21/metropole-hotel-kampala.jpg'
    },
    {
      id: 'fcecae2f-a1a6-4d03-9757-42944de25551',
      country: 'Uganda',
      city: 'Kampala',
      state: 'Busia',
      streetAddress: 'KN 22 ST',
      locationID: '3ea5caaf-e10f-45c3-9876-cd690fe27a32',
      propertyType: 'Hostel',
      numberOfRooms: 10,
      typeOfBed: 'Double Decker',
      title: 'Busia girls hostels',
      description: 'A serene environment for relaxation',
      photos: 'https://images.trvl-media.com/hotels/49000000/48420000/48413500/48413434/bfe49aff.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium'
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Accommodation', null, {})

};
=======
export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Accommodation', [
    {
      id: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      country: 'Rwanda',
      city: 'Kigali',
      state: 'Nyarugenge',
      streetAddress: 'KN 22 ST',
      locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
      propertyType: 'Hostel',
      numberOfRooms: 100,
      typeOfBed: 'Double Decker',
      title: 'Kigali Hostels',
      description: 'A serene environment for relaxation',
      photos: 'image.png'
    },
    {
      id: '520f2b37-7bac-4490-aa7a-96f15915bcd7',
      country: 'Rwanda',
      city: 'Kigali',
      state: 'Nyarugenge',
      streetAddress: 'KN 22 ST',
      locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
      propertyType: 'Hostel',
      numberOfRooms: 0,
      typeOfBed: 'Double Decker',
      title: 'Kigali Hostels',
      description: 'A serene environment for relaxation',
      photos: 'image.png'
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Accommodation', null, {})

};
>>>>>>> adds pusher
