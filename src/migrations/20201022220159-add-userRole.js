module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'user_role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "requester"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'user_role');
  }
};
