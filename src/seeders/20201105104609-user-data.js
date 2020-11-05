'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Amidesjeunes',
      last_name: 'Habumugisha',
      email: 'habajeune13@gmail.com',
      password: '123456780',
      verified: true,
      address: 'Kigali',
      language: 'English',
      refreshtoken: 'refreshtoken',
      profile_picture: 'image.png'
    },
    {
      first_name: 'Luis',
      last_name: 'Mucyo',
      email: 'kamana1@gmail.com',
      password: '123456780',
      verified: false,
      address: 'Kigali',
      language: 'English',
      refreshtoken: 'refreshtoken',
      profile_picture: 'image.png'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface('users', null, {});
  }
};
