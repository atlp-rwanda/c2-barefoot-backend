module.exports = (sequelize, DataTypes) => {
  const Locale = sequelize.define('Locale', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Locale.associate = (models) => {
    Locale.hasMany(models.User, {
      foreignKey: 'locale_id'
    });
  };
  return Locale;
};
