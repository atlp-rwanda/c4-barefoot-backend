module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accommodationID: { allowNull: true, type: DataTypes.UUID },
    wifi: DataTypes.BOOLEAN,
    airConditioner: DataTypes.BOOLEAN,
    shampoo: DataTypes.BOOLEAN,
    ironing: DataTypes.BOOLEAN,
    tv: DataTypes.BOOLEAN,
    smokeDetector: DataTypes.BOOLEAN,
    fireExtinguisher: DataTypes.BOOLEAN,
    lockOnDoor: DataTypes.BOOLEAN
  });

  return Amenity;
};