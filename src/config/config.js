require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'LOCAL_DB_URL',
    database: process.env.LOCAL_DB_NAME,
    host: process.env.LOCAL_DB_HOST,
    port: process.env.LOCAL_DB_PORT,
    dialect: 'postgres',
    operatorsAliases: 0, 
    logging: false,
  },
  test: {
    use_env_variable: 'CI_DB_URL',
    database: process.env.CI_DB_NAME,
    password: process.env.CI_DB_PASSWORD,
    username: process.env.CI_DB_USERNAME,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
    
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    dialect: 'postgres',
    logging: false,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
  }
};
