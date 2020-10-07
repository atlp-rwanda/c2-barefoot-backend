import db from './src/config/connection.js'

db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log('Error: ' + err))

