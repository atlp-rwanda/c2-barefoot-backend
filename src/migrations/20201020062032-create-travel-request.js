'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('TravelRequests', {
      travelID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      managerID: {
        allowNull: false,
        type:DataTypes.INTEGER
      },
      userID: {
        allowNull: false,
        type:DataTypes.STRING
      },
      // tripID: {
      //   allowNull: false,
      //   type:DataTypes.DATE
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