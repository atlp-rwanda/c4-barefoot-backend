'use strict';

module.exports = function (sequelize, DataTypes) {
  var TravelRequest = sequelize.define('TravelRequest', {
    travelId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    managerId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    status: {
      allowNull: false,
      defaultValue: "pending",
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize: sequelize,
    modelName: 'TravelRequest',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return TravelRequest;
};