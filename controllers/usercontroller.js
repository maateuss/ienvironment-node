const db = require("../models");
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
  
};


exports.findOne = (req, res) => {
  
};


exports.update = (req, res) => {
  
};


exports.delete = (req, res) => {
  
};


exports.deleteAll = (req, res) => {
  
};