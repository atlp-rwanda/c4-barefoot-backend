'use strict';

module.exports = (sequelize, DataTypes) => {
  const TravelComments = sequelize.define('TravelComments',{
    commentId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID
    },
    travelId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    comment: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Travelcomments',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return TravelComments
};