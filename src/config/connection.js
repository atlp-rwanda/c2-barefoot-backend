import Sequelize from 'sequelize';

const { DB_NAME, DB_USERNAME, PASSWORD, HOST} = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, PASSWORD, {
  host: HOST,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  }
});

export default db;
