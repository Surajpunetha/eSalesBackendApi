const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/connectionDb');
const controller = require('./controller/user_controller');
const res = require("express/lib/response");

var jwt = require('jsonwebtoken');
const config = require("./config/jwt.config");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();//{force:false}

app.get("/", (req, res) => {
    console.log('API is up!');
    res.json({ message: "Welcome to Esales application." });
});


const verifyToken = (req, res, next) => {
  console.log('Headers:', req.headers);
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized token!' });
    }
    req.userId = decoded.id;
    next();
  });
};

//create users.
app.post("/Users/createUsers",(req,res)=>{
 controller.createUsers(req,res);
});

//fetch users detail.
app.get("/Users/getUsers",verifyToken,function(req, res){
  controller.findAllUsers(req,res);
});

//fetch single users using path param.
app.get("/Users/getUserById/:user_id",verifyToken, function(req, res){
  controller.findUserById(req,res);
});

//fetch single users using query param.
app.get("/Users/getUserByName", verifyToken,function(req, res){
  controller.findUserByName(req,res);
});

//update single users using put.
app.put("/Users/updateUsersDetail", verifyToken,function(req, res){
  controller.updateUsers(req,res);
});

//delete users using query param.
app.delete("/Users/deleteUsersData", verifyToken, function(req, res){
  controller.deleteUsers(req,res);
});

//login users using body param.
app.post("/Users/userSignIn", function(req, res){
  controller.signInUser(req,res);
});

//check port running.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
