module.exports = (sequelize, DataTypes) => {
  const Locale = sequelize.define('Locale', {
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    }
  });

  Locale.associate = (models) => {
    Locale.hasMany(models.User, {
      foreignKey: 'user_locale'
    });
  };
  return Locale;
};
