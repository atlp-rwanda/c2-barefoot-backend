export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Locations', [
    {
      id: 'c6028e0d-ef88-4693-ab49-f37669891724',
      LocationName: 'Kigali',
      country: 'Rwanda',
      description: 'The land of a thousand hills',
      link: 'https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/africa/downtown-kigali-rwanda.adapt.1900.1.jpg'
    },
    {
      LocationName: 'Capetown',
      country: 'South Africa',
      description: 'This is one of best cities in Africa and you can also find good accomodations.',
      link: 'https://freewalkingtourscapetown.co.za/wp-content/uploads/2018/05/cropped-cape-town-header-pic-1.png'
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})

};
