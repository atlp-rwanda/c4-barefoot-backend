'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), id: undefined}
    }
  };
  Chat.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sender: {
      type:DataTypes.UUID,
      allowNull:false
    },
    receiver: {
      type:DataTypes.UUID,
      allowNull:false
    },
    message: {
      type:DataTypes.TEXT
      
    },
    file: {
      type:DataTypes.STRING
    
    },
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};