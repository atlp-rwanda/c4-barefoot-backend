module.exports = (sequelize, DataTypes) => {
  const ChatV = sequelize.define('ChatV', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'plain-text'
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return ChatV;
};
