module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'refreshtoken', {
      type: Sequelize.STRING(700),
      allowNull: false,
      defaultValue: 'refreshtoken'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
