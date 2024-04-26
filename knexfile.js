const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    client: 'mysql2',
    connection: {
      host: process.env.HOST,
      port: process.env.PORTDB,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};