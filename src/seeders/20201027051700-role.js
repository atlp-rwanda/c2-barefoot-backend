module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('roles', [{
      name: 'administrator',
      description:'This is the administrator of Barefoot nomad',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'requester',
      description:'This is the requester',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
