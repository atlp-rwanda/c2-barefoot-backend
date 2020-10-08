import Sequelize from 'sequelize'
// import pg from 'pg'

// pg.defaults.ssl = true;
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
console.log(process.env.DB_NAME);


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
    pool:{
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    }
})


export default db