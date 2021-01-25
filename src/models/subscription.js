module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    endpoint: {
      type: DataTypes.TEXT
    },
    expirationTime: {
      type: DataTypes.INTEGER
    },
    p256dh:{
      type: DataTypes.TEXT
    },
    auth:{
      type: DataTypes.TEXT
    },
    userId:{
      type: DataTypes.UUIDV4
    }
    
  }, {timestamps:false});

  // Notification.associate = (models) => {
  //   Notification.belongsTo(models.User, {
  //     foreignKey: 'user_id'
  //   });
  // };
  return Subscription;
};
