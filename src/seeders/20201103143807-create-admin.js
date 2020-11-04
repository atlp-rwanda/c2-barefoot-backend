'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('users', [{
    //   first_name: 'Barefoot',
    //   last_name: 'Administrator',
    //   email: 'renedeolynda@gmail.com',
    //   password: 'barefoot.Admin:)',
    //   address: 'Kigali',
    //   language: 'English',
    //   profile_picture: 'admin.png',
    //   verified: true,
    //   user_role:"administrator"
    // }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
