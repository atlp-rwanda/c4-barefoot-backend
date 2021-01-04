"use strict";

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    accommodationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Review.associate = function (models) {
    Review.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'accommodation'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Review;
};