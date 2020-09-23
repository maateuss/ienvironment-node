const db = require("../models");
const user = require("../models/user");
const User = db.users;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      // Create a User
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        active: req.body.active ? req.body.active : false
      });
    
      user
        .save(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
};


exports.findAll = (req, res) => {
    User.find({}).then(data=> {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred."
      });
    });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id).then(data=> {
      if(!data){
        res.status(404).send({message: "not found"});
      }
      else res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
      
    );
};


exports.update = (req, res) => {
  
};


exports.delete = (req, res) => {
  
};


exports.deleteAll = (req, res) => {
  
};