require('@babel/register')
module.exports =  {
  development: {
    username: "andelaTeam",
    password: "andela@post",
    database: "barefoot",
    host: "127.0.0.1",
    port: "5000",
    dialect: "postgres",
    operatorsAliases: 0
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
