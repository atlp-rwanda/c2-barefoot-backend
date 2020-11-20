module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    title: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'unreaded'
    }
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User);
  };
  return Notification;
};
