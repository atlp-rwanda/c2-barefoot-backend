// require('@babel/register')

require('dotenv/config');

module.exports = {
  development: {
    username: process.env.LOCAL_DB_USERNAME,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
    host: process.env.LOCAL_DB_HOST,
    port: process.env.LOCAL_DB_PORT,
    db_url: process.env.DEV_DB_URL,
    dialect: 'postgres',
    operatorsAliases: 0
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_HOST,
    port: process.env.CI_PORT,
    db_url: process.env.CI_DB_URL,
    use_env_variable: process.env.TEST_DB_URL,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    db_url: process.env.DB_URL,
    host: process.env.DB_HOST,
    use_env_variable: process.env.DB_URL,
    dialect: 'postgres'
  }
};
