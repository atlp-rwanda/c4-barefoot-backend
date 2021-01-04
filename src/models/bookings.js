module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accommodationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    From: {
      type: DataTypes.DATE,
      allowNull: false
    },
    To: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkedout: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.Accommodation, {
      foreignKey: 'AccommodationId',
      as: 'accommodation'

    });
  };

  return Booking;
};
