"use strict";

module.exports = function (sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'not readed'
    }
  }, {});

  Notification.associate = function (models) {
    Notification.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };

  return Notification;
};