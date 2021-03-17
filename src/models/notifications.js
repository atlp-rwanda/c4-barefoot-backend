module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Notification;
};
