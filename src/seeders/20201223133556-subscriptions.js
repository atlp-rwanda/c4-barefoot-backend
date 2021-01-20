'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Subscriptions', [{
      id: 'c6028e0d-ef88-4693-ab49-f37669891724',
      endpoint:"https://fcm.googleapis.com/fcm/send/eCNajpqUkwQ:APA91bE-fYE2KMDuS4Npi7JJ2Hnee3aw2wQ4YMqbCsi9pRJCV-SvYvygBtQh9TKsSpNBwjqky4J0Ak2M4PimM2AgWHbjmAYFc9hGUprr31FqXVd1yGoOCSvAm1fKR5YOc3BcMR8zgigb",
      expirationTime:null,
      p256dh:"BOo-ESEOuYVyjHhSDoUHG0qebpVm7-KPwr94wLSA-zusCyyw3cCDhpcpmr13Dw7t1_whVgnB6Ok09DmnoMsPk4c",
      auth:"WJOOR7pPtY7d7l9gbc7NWA",
      userId:"0ce36391-2c08-4703-bddb-a4ea8cccbbc5"

      },

      {
         id: 'a9610cf3-4056-41dd-92ca-463088e23d07',
         endpoint:"https://fcm.googleapis.com/fcm/send/eCNajpqUkwQ:APA91bE-fYE2KMDuS4Npi7JJ2Hnee3aw2wQ4YMqbCsi9pRJCV-SvYvygBtQh9TKsSpNBwjqky4J0Ak2M4PimM2AgWHbjmAYFc9hGUprr31FqXVd1yGoOCSvAm1fKR5YOc3BcMR8zgigb",
         expirationTime:null,
         p256dh:"BOo-ESEOuYVyjHhSDoUHG0qebpVm7-KPwr94wLSA-zusCyyw3cCDhpcpmr13Dw7t1_whVgnB6Ok09DmnoMsPk4c",
         auth:"WJOOR7pPtY7d7l9gbc7NWA",
         userId:"d74fcc5e-5755-4366-83ef-cf306b013c46"
   
         }
   
   ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
