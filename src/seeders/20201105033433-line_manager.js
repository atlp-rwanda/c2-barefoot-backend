module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('line_managers', [{
      first_name: 'none',
      last_name: 'none',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('line_managers', null, {});
     
  }
};
