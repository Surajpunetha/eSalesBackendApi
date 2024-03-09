const Sequelize = require('sequelize');
require('dotenv').config()
//local db credentials.
/*const port ='3306';
const database = 'freedb_eSalesDb';
const username = 'root';
const password = '';
const hostname ='localhost';
*/

const port = process.env.PORT;
const database = process.env.DB_DBNAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const hostname = process.env.DB_HOST;

//live db credentials.
/*const database = 'freedb_eSalesDb';
const username = 'freedb_Suraj123';
const password = 'yT6#mj3SkM7?$Pa';
const hostname ='sql.freedb.tech';*/

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

// const connect=async() =>{
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// connect()

/*
dashborad=https://freedb.tech/dashboard/
host name= sql.freedb.tech
user= freedb_Suraj123
pass= yT6#mj3SkM7?$Pa
database= freedb_eSalesDb
table= users
*/