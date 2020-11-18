const db = require("../models");
const Equipment = db.equipments;
const Environments = db.environments;
const Files = require("../controllers/filecontroller");

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      var imageFile = await Files.getImageDataById(req.body.img);


      const equipment = new Equipment({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        entityType: req.body.entityType,
        topic: req.body.topic,
        simulationMode: req.body.simulationMode,
        img: imageFile
      });
    
      equipment
        .save(equipment)
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
    Equipment.find({}).then(data=> {
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

    Equipment.findById(id).then(data=> {
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

  Equipment.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
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


exports.delete = async (req, res) => {
    const id = req.params.id;

    var environmentsAffected;
    
    await Environments.find({'equipments':id}).then(data =>{
      environmentsAffected = Array.from(data);
    }).catch(err => {
      res.status(500).send({
        message: "Error while searching for affected environments"
      })
    })

    environmentsAffected.forEach(element => {
      element.equipments = element.equipments.filter(function(equip) {
        return equip != id;
      });
      
      Environments.findByIdAndUpdate(element.id, element, {useFindAndModify: false})
      .then(data =>{
        if(!data){
          res.status(404).send({
            message: "Id not found for affected environment"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error while updating affected environment"
        })
      });
    });

    Equipment.findByIdAndRemove(id).then(data => {
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