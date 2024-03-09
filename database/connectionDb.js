const Sequelize = require('sequelize');
require('dotenv').config()

const port = process.env.PORT;
const database = process.env.DB_DBNAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const hostname = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
  host: hostname,
  port:port,
  dialect:'mysql' 
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models-table
db.users = require("../model/users_model")(sequelize, Sequelize);
module.exports=db;
