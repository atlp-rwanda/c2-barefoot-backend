module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('users', [{
      first_name: 'Barefoot',
      last_name: 'Administrator',
      email: 'renedeolynda@gmail.com',
      password: 'barefoot.Admin:)',
      address: 'Kigali',
      language: 'English',
      profile_picture: 'admin.png',
      verified: true,
      user_role_id:1,
      manager_id: 1
    },
    {
      first_name: 'Ineza',
      last_name: 'Bonte',
      email: 'inezabonte@gmail.com',
      password: '12345678',
      address: 'Kigali',
      language: 'English',
      verified: false,
      profile_picture: 'image.png',
      user_role_id: 2,
      manager_id: 1
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
