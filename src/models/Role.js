'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {

    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});

  Role.associate = (models) => {
    Role.hasMany(models.User, {
        foreignKey: 'user_role_id',
        as: 'user_role',
      });
  };
return Role;
};