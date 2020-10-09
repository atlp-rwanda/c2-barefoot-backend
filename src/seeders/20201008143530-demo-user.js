'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [{
        firstName: "M",
        lastName: "Jacks",
        email: "mjacks@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
