'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('TravelRequests', {
      travelId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      managerId: {
        allowNull: false,
        type:DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type:DataTypes.STRING
      },
      // tripId: {
      //   allowNull: false,
      //   type:DataTypes.INTEGER
      // },
      status: {
        allowNull: false,
        defaultValue: "pending",
        type:DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('TravelRequests');
  }
};