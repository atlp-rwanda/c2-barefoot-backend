module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'manager_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaulValue: 1
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'manager_id');
  }
};
