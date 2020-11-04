module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    //  await queryInterface.bulkInsert('Roles', [{
    //   name: 'requester',
    //   description:'This is the manager',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    //  }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
