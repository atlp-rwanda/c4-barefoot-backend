module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    LocationName: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING,
    currency: DataTypes.STRING,
    link: DataTypes.STRING
  });

  Location.associate = (models) => {
    Location.hasMany(models.Accommodation, {
      foreignKey: 'locationID',
      as: 'Location',
      onDelete: 'cascade'
    });
  };
  return Location;
};
