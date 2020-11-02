'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
        defaultValue: DataTypes.UUIDV4,
        unique: true,
=======
        defaultValue: null,
>>>>>>> fixing bugs
=======
        defaultValue: DataTypes.UUIDV4,
        unique: true,
>>>>>>>  fixed bugs
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
<<<<<<< HEAD
<<<<<<< HEAD
=======
        defaultValue: null,
>>>>>>> fixing bugs
=======
>>>>>>>  fixed bugs
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        }
      },
      password: {
        type: DataTypes.STRING,
<<<<<<< HEAD
<<<<<<< HEAD
        allowNull: false,
        defaultValue: 'password',
        unique: true,
=======
        allowNull: true,
        defaultValue: null,
>>>>>>> fixing bugs
=======
        allowNull: false,
        defaultValue: 'password',
        unique: true,
>>>>>>>  fixed bugs
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
=======
        type: Sequelize.INTEGER
=======
        type: DataTypes.INTEGER
>>>>>>> fixing bugs
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
        defaultValue: null,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: null,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
<<<<<<< HEAD
  }
};
>>>>>>> build get and update features
=======
  },
};
>>>>>>> fixing bugs
