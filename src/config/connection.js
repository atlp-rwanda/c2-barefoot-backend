import Sequelize from 'sequelize'
// import pg from 'pg'

// pg.defaults.ssl = true;
const DB_NAME = 'ddibi6hgtgr7ol'
const USERNAME = 'jqyhwdhfxulrub'
const PASSWORD = '1e7ff0a83ebe2d9ac0af18133f9b949412391fb4b4440f833cd309de437ea52a'
const HOST = 'ec2-54-160-18-230.compute-1.amazonaws.com'

const db = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
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