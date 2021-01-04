'use strict';

module.exports = function (sequelize, DataTypes) {
  var TravelComments = sequelize.define('TravelComments', {
    commentId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID
    },
    travelId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    comment: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize: sequelize,
    modelName: 'Travelcomments',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return TravelComments;
};