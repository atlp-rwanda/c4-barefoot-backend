"use strict";

module.exports = function (sequelize, DataTypes) {
  var Booking = sequelize.define('Booking', {
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
    }
  });

  Booking.associate = function (models) {
    Booking.belongsTo(models.Accommodation, {
      foreignKey: 'AccommodationId',
      as: 'accommodation'
    });
  };

  return Booking;
};