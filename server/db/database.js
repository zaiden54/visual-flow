require('dotenv').config();

module.exports = {
  development: {
    // username: 'root',
    // password: null,
    // database: 'database_development',
    // host: '127.0.0.1',
    // dialect: 'mysql',
    use_env_variable: 'DB_URL',
    logging: false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
