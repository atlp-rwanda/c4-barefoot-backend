'use strict';

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'user_role_id',
      as: 'user_role'
    });
  };

  return Role;
};