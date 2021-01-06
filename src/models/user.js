import sequelizePaginate from 'sequelize-paginate';
import roles from '../utils/roles';
import { hashPassword } from '../utils/auth';

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    occupation: DataTypes.STRING,
    bio: { allowNull: true, type: DataTypes.STRING, defaultValue: null },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    user_role_id: { allowNull: true, type: DataTypes.UUID, defaultValue: roles.REQUESTER, },
    manager_id: { allowNull: true, type: DataTypes.UUID },
    refreshtoken: { type: DataTypes.STRING, allowNull: false, defaultValue: 'refreshtoken' },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg'
    },
    language: { type: DataTypes.STRING, allowNull: false, defaultValue: 'English' },
    address: { type: DataTypes.STRING, allowNull: false },
  }, {});

  User.associate = (models) => {
    User.hasOne(models.User, {
      foreignKey: 'manager_id',
      as: 'line_manager',
    });
    User.belongsTo(models.Role, {
      foreignKey: 'user_role_id',
      as: 'user_role'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'user_id'
    });

    

    // user.hasMany(Travel_request, {
    //   as: 'requester',
    //   foreignKey: 'userId',
    // targetKey: 'id',
    //  onUpdate: 'CASCADE',
    // onDelete: 'CASCADE'

    // });

    // user.belongsToMany(travelRequest, {
    //   through: 'Accomodation',
    //   as: 'TravelRequest',
    //   foreignKey: 'userId',
    //   onDelete: 'CASCADE'
    // })
  };

  //  hash user password before creating user
  User.beforeCreate((user) => {
    if (user.password) { user.password = hashPassword(user.password); }
  });
  //  hash user password before updatng user password
  User.beforeBulkUpdate(({ attributes: user }) => {
    if (user.password) { user.password = hashPassword(user.password); }
  });
  sequelizePaginate.paginate(User);
  return User;
};
