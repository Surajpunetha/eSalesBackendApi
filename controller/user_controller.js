const db = require("../database/connectionDb"); 
const Users = db.users;
var jwt = require('jsonwebtoken');
const config = require("../config/jwt.config");


 async function createUsers(req,res){  
  if(!req.body.name || !req.body.email || !req.body.birthDate|| !req.body.password){
    return res.status(400).send({
      message:"please provide required data."
      });
  }
  const existingUser= await Users.findOne({
          where:{
            email: req.body.email
          }});

  if(existingUser){
    return res.status(400).send({
              message:`${req.body.email} email is already registered.`
    });
  }

  const userObject={
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    birthDate:req.body.birthDate,
    mobile:req.body.mobile,
    password:req.body.password,
    address:req.body.address,
  }

  Users.create(userObject).then(data=>{
    res.send(data);
  }).catch(error=>{
  res.status(500).send(error);
  });

}

function findAllUsers(req, res){
      Users.findAll({})
          .then(data => {
            res.send({data});
          })
          .catch(err => {
            res.status(500).send({
              message:err.message || "Some error occurred while retrieving tutorials."
            });
          });
}

function findUserById(req, res){
  const id = req.params.user_id;
  Users.findByPk(id)
      .then(data => { 
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:err.message || "Some error occurred while retrieving tutorials."
        });
      });
}

function findUserByName(req, res){
    const name = req.query.name;
    Users.findOne({
      where: {
        name: name
      }
    })
    .then(data => { 
      res.send({data});
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Some error occurred while retrieving data."
      });
    });
  }

  /* function findUserByName(req, res){
    const name = req.query.name;
    Users.findOne({
      attributes: ['user_id', 'name', 'email'], // specify the fields you want in the response.
      where: {
        name: name
      }
    })
    .then(data => { 
      res.send({data});
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Some error occurred while retrieving data."
      });
    });
  }
 */

  function updateUsers(req, res){
    if(!req.body.name || !req.body.email || !req.body.birthDate){
      return res.status(400).send({
        message:"please provide required data."
        });
    }
    
    const userObject={
      name:req.body.name,
      email:req.body.email,
      birthDate:req.body.birthDate,
      gender:req.body.gender,
      mobile:req.body.mobile,
      password:req.body.password,
      address:req.body.address,
    }
  
    Users.update(userObject, {
      where: {
        email: req.body.email
      }
    }).then(data=>{
      res.send({message:"Updated data successfully for "+req.body.name+"."
    });
    }).catch(error=>{
    res.status(500).send(error);
    }); 
  }
  
  function deleteUsers(req, res){
    const id = req.query.user_id;
    Users.destroy({
      where: {
        user_id: id
      }
    })
    .then(data => { 
      res.send({
        message:"User record deleted successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Some error occurred while retrieving data."
      });
    });
  }

  async function signInUser(req, res){
    try{
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.status(404).send({
        message: "User Not Found."
      });
    }

    const passwordValid = await Users.findOne({
      where: {
        password: req.body.password
      }
    });

    if(!passwordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password."
      });
    }

    const token = jwt.sign({ id: user.user_id }, config.secret, {
      // "5s", "1m", "1h", "1d", "1y"
      //expiresIn: 86400  //24 hours
      expiresIn: "1y"
    });

    res.status(200).send({
      user_id: user.user_id,
      name:user.name,
      email: user.email,
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

module.exports = {
    createUsers,
    findAllUsers,
    findUserById,
    findUserByName,
    updateUsers,
    deleteUsers,
    signInUser
};