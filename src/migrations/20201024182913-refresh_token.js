module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'refreshtoken', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'refreshtoken'
    });
    // await queryInterface.addColumn('users', 'user_role_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   defaultValue: 1
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'refreshtoken');
    // await queryInterface.removeColumn('users', 'user_role_id');
  }
};
