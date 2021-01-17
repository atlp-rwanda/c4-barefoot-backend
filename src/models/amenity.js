module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accommodationId: {
      allowNull: true,
      type: DataTypes.UUID
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    airConditioner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shampoo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ironing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    smokeDetector: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fireExtinguisher: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lockOnDoor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Amenity.associate = (models) => {
    Amenity.belongsTo(models.Accommodation);
  };

  return Amenity;
};
