module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    locationID: { allowNull: true, type: DataTypes.UUID },
    propertyType: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    typeOfBed: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    photos: DataTypes.STRING,
  });

  Accommodation.associate = (models) => {
    Accommodation.hasOne(models.Amenity, {
      foreignKey: 'AccommodationId',
      as: 'Amenity',
      onDelete: 'cascade'
    });

    Accommodation.hasMany(models.Booking, {
      foreignKey: 'accommodationId',
      foreignKey: 'AccommodationId',
      as: 'Booking',
      onDelete: 'cascade'
    });
  };
  return Accommodation;
};
