'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // models.Trip.hasOne(TravelRequest, {foreignKey:"travelId"})
      // TravelRequest.belongsToMany(models.Trip, {foreignKey:"travelId"})
      // TravelRequest.sync({alter:true})
    }
  };
  TravelRequest.init({
    travelId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
  }, {
    sequelize,
    modelName: 'TravelRequest',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return TravelRequest;
};