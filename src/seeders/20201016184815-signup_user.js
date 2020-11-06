module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('users', [{
      first_name: 'Barefoot',
      last_name: 'Administrator',
      email: 'renedeolynda@gmail.com',
      password: 'barefoot.Admin:)',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'admin.png'
    },
    {
      first_name: 'Ineza',
      last_name: 'Bonte',
      email: 'inezabonte@gmail.com',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'user.png'
    },
    {
      first_name: 'Rene',
      last_name: 'Promesse',
      email: 'renepromesse@gmail.com',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'user.png'
    },
    {
      first_name: 'Jackson',
      last_name: 'Mugabo',
      email: 'jackson@gmail.com',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'user.png'
    },
    {
      first_name: 'James',
      last_name: 'Bond',
      email: 'james@gmail.com',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'user.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
