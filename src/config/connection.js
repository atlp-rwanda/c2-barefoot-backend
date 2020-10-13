import Sequelize from 'sequelize';

// production database credentials
const { DB_NAME, DB_USERNAME, PASSWORD, HOST} = process.env;

var db
// local database credentials
const { DB_NAME_LOCAL, DB_USERNAME_LOCAL, PASSWORD_LOCAL, HOST_LOCAL} = process.env;
if((process.env.NODE_ENV).trim() === "development"){
  /**during set up i set postgres to work on port 500
   * So, you put it on 5432 if you used default port locally 
  */
  const port = 5000
  db = new Sequelize(DB_NAME_LOCAL, DB_USERNAME_LOCAL, PASSWORD_LOCAL, {
    host: HOST_LOCAL,
    port: port,
    dialect: 'postgres',
    /** In localhost this causes SSL connection error */
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // },
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  });
}else{
  // Production setup
  const port = 5432
  db = new Sequelize(DB_NAME, DB_USERNAME, PASSWORD, {
    host: HOST,
    port: port,
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
}



export default db;
