module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Amenities', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      accommodationID: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Accommodation',
          key: 'id',
        },
      },
      wifi: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      airConditioner: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      shampoo: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      ironing: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      tv: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      smokeDetector: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      fireExtinguisher: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      lockOnDoor: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Amenities');
  }
};
