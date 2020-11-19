const db = require("../models");
const CustomEvent = db.customevents;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      const customevents = new CustomEvent({
        name: req.body.name,
        topic: req.body.topic,
        description: req.body.description,
        script: req.body.script,
        enabled: req.body.enabled
      });
    
      customevents
        .save(customevents)
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
    CustomEvent.find({}).then(data=> {
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

    CustomEvent.findById(id).then(data=> {
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

  CustomEvent.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
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
    CustomEvent.findByIdAndRemove(id).then(data => {
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