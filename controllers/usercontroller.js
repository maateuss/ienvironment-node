const db = require("../models");
const JWT = require("jsonwebtoken");
const User = db.users;

exports.login = (req, res) => {

  if(!req.body){
    return res.status(400).send({messsage: "Empty data"});
  }

  if(!req.body.password || !req.body.login){
    return res.status(400).send({message: "login or password invalid"});
  }

  User.findOne({login: req.body.login}, function(err, user){
    if(err) throw err;

    user.comparePassword(req.body.password, function(err, isMatch){
      if(err) throw err;

      if(isMatch) {
        
        const id = user.id
        var token = JWT.sign({id} , process.env.SECRET, {
          expiresIn: 3600
        })

        var date = new Date();
        date.setTime(date.getTime() + (60*60*1000))

        return res.json({user: user, auth: true, token: token, expirationTime: date});
      }
    })
  })


  // const id = 'objectid123456780000'
  // var token = JWT.sign( { id }, process.env.SECRET, {
  //   expiresIn: 300
  // });
  // return res.json({auth: true, token: token});
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
        enabled: req.body.enabled ? req.body.enabled : false
      });
    
      user
        .save(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred."
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
  if(!req.body){
    return res.status(400).send({
      message: "No Data"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data =>{
      if(!data){
        res.status(404).send({
          message: "Id not found"
        });
      } else res.send({message: "Updated"})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error while updating"
      })
    });

};


exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id).then(data => {
      if (!data){
        res.status(404).send({
          message: "not found"
        });
      } else {
        res.send({message: "deleted"});
      }

    }).catch(err =>{
      res.status(500).send({
        message: "Error while deleting"
      });
    });
};


exports.deleteAll = (req, res) => {
    res.status(401).send({message: "forbidden"});
};