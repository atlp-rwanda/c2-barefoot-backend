'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.TravelRequest.hasMany(Trip, {foreignKey:"travelId", targetKey:"travelId"})
      Trip.belongsTo(models.TravelRequest, {foreignKey:"travelId", targetKey:"travelId"})
      // Trip.sync({alter:true})
    }
  };
  Trip.init({
    tripId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    originCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tripDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE
    },
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    travelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    
  }, {
    sequelize,
    modelName: 'Trip',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return Trip;
};