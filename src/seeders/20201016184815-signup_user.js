module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Ineza',
      last_name: 'Bonte',
      email: 'inezabonte@gmail.com',
      password: '$2b$10$QFid267DDwcB5z1LJJiYxOm9un.5yBeyFBfX3GWgqjUenx/Fcmt.O',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'image.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
