module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Notifications', {
      id: 'fb94de4d-47ff-4079-89e8-b0186c0a3br4',
      userId: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
      title: 'approve',
      message: 'your travel request was approved',
      status: 'unreaded'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
