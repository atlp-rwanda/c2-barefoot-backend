'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => { 
       await queryInterface.bulkInsert('users', [{
        first_name: 'M',
        last_name: 'Jackson',
        email: 'jackswalter7@gmail.com',
        password: '$2b$10$QFid267DDwcB5z1LJJiYxOm9un.5yBeyFBfX3GWgqjUenx/Fcmt.O',
        address: 'Kigali',
        language: 'Kinyarwanda',
        profile_picture: 'myImage.png',
        user_role_id: 2
       }], {});
  },

  down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('users', null, {});
  }
};
