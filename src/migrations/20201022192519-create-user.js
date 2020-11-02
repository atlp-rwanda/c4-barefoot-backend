'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
<<<<<<< HEAD
        defaultValue: DataTypes.UUIDV4,
        unique: true,
=======
        defaultValue: null,
>>>>>>> fixing bugs
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
<<<<<<< HEAD
=======
        defaultValue: null,
>>>>>>> fixing bugs
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        }
      },
      password: {
        type: DataTypes.STRING,
<<<<<<< HEAD
        allowNull: false,
        defaultValue: 'password',
        unique: true,
=======
        allowNull: true,
        defaultValue: null,
>>>>>>> fixing bugs
        validate: {
          min: 8,
          notEmpty: true
        }
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: true
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true
        }
      },
      language: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true
        }
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true
        }
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true
        }
      },
      user_role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1,
        validate: {
          notEmpty: true
        },
      },
      manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
