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
      console.log(models);
      
      models.Trip.hasOne(TravelRequest, {foreignKey:"tripId"})
      TravelRequest.belongsTo(models.Trip, {foreignKey:"tripId"})
      // TravelRequest.sync({alter:true})
    }
  };
  TravelRequest.init({
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
    }
  }, {
    sequelize,
    modelName: 'TravelRequest',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return TravelRequest;
};