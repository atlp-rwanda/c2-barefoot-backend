'use strict';
// const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
//   class Trip extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       // models.TravelRequest.hasMany(Trip, {foreignKey:"travelId", targetKey:"travelId"})
//       // Trip.belongsTo(models.TravelRequest, {foreignKey:"travelId", targetKey:"travelId"})
//       // Trip.sync({alter:true})

//     }
//   };
  // Trip.init({
    const Trip = sequelize.define('Trip', {
    tripId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
      allowNull: false
    },
    // travelId: {
    //   type: DataTypes.UUID,
    //   allowNull: false
    // },
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
  Trip.associate = (models) => {
    Trip.belongsTo(models.TravelRequest, {
      foreignKey:'travelId',
      // as: 'travelRequest'
    })
  }
  return Trip;
};