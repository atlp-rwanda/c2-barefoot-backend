export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Accommodation', [
    {
      id: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      country: 'Rwanda',
      city: 'Kigali',
      state: 'Nyarugenge',
      streetAddress: 'KN 22 ST',
      locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
      propertyType: 'Hotel',
      numberOfRooms: 100,
      typeOfBed: 'Single',
      title: 'Marriot Hotel',
      description: 'A serene environment for relaxation',
      photos: 'https://cache.marriott.com/marriottassets/marriott/KGLMC/kglmc-exterior-0030-hor-feat.jpg'
    },
    {
      id: '520f2b37-7bac-4490-aa7a-96f15915bcd7',
      country: 'Rwanda',
      city: 'Kigali',
      state: 'Nyarugenge',
      streetAddress: 'KN 22 ST',
      locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
      propertyType: 'Hotel',
      numberOfRooms: 0,
      typeOfBed: 'single',
      title: 'Serena Hotel',
      description: 'A serene environment for relaxation',
      photos: 'https://www.rwandagorillasafaris.com/wp-content/uploads/2020/01/serena-kigali.jpg'
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Accommodation', null, {})

};
