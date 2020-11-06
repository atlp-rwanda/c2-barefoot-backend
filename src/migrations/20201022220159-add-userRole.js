module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'user_role_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 2
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'user_role_id');
  }
};
