'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Managers', [{
        Name: 'John Doe',
        Role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Managers', null, {});
     
  }
};
