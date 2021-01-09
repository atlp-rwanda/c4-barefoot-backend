module.exports = (sequelize, DataTypes) => {
  const ChatV = sequelize.define('ChatV', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    visitor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    file: {
      type: DataTypes.STRING
    }
  });

  return ChatV;
};
