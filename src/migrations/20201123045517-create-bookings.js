module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn('uuid_generate_v4')
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      accommodationID: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Accomodation',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      From: {
        type: Sequelize.DATE
      },
      To: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};
