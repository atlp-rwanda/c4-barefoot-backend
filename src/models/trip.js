module.exports = (sequelize, DataTypes) => {
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
      allowNull: true
    },
    destinationId: {
      type: DataTypes.STRING,
      allowNull: true
    },
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
      foreignKey: 'travelId',
    });
  };
  return Trip;
};
