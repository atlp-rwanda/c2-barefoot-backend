'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Admins', [{
        firstName: "M",
        lastName: "Jacks",
        email: "mjacks@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
 
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Admins', null, {});
     
  }
};
