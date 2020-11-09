'use strict';
module.exports = (sequelize, DataTypes) => {
  const Line_manager = sequelize.define('Line_manager', {

    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  }, {});

  Line_manager.associate = (models) => {
    Line_manager.hasMany(models.User, {
        foreignKey: 'manager_id',
        as: 'Line_manager',
        onDelete: 'CASCADE',
      });
  };
return Line_manager;
};