const db = require("../models");
const Environment = db.environments;
const Equipment = db.equipments;
const CustomEvents = db.customevents;
const Files = require("../controllers/filecontroller");

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      var imageFile = await Files.getImageDataById(req.body.img);


      const environment = new Environment({
        name: req.body.name,
        description: req.body.description,
        equipments: req.body.equipments,
        events: req.body.events,
        img: imageFile,
        enabled: req.body.enabled
      });
    
      environment
        .save(environment)
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
    Environment.find({}).then(data=> {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred."
      });
    });
};


exports.getFullData = async (req, res) => {
  try{
    //get all sensors info *done
        const id = req.params.id;
    
        var ambiente = await Environment.findById(id);
        var sensores = ambiente.equipments;
        var sensoresData = [];
        
        const promises = sensores.map(async (sensorid) =>{
          var data = await Equipment.findById(sensorid);
            sensoresData.push(data);
        })
        
        await Promise.all(promises);


        var eventos = ambiente.events;
        var eventosData = [];

        promises = eventos.map(async (eventoid) => {
          var data = await CustomEvents.findById(eventoid);
          eventosData.push(data);
        });

        await Promise.all(promises);
    
    
    //get chart for last 8 hours
    
        
    
    // wrap it all
    
        var viewModel = { ambienteinfo: ambiente, sensores: sensoresData, eventos: eventosData}
    
        res.send(viewModel);
      }
      catch(err){
        res.status(500).send({
          message:err.message
        });
      }
    
}

exports.getAllSensors = async (req, res) => {
  try{
//get all sensors info *done
    const id = req.params.id;

    var ambiente = await Environment.findById(id);
    var sensores = ambiente.equipments;
    var sensoresData = [];
    
    const promises = sensores.map(async (sensorid) =>{
      var data = await Equipment.findById(sensorid);
      if(data && data.type == 'Sensor'){
        sensoresData.push(data);
      }
    })
    
    await Promise.all(promises);


//get chart for last 8 hours

    

// wrap it all

    var viewModel = { ambienteinfo: ambiente, sensores: sensoresData}

    res.send(viewModel);

  


  }

  catch(err){
    res.status(500).send({
      message:err.message
    });
  }



}

exports.findActives = (req, res) =>{
  Environment.find({enabled: true}).then(data=> {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred."
    });
  });
}



exports.findOne = (req, res) => {
    const id = req.params.id;

    Environment.findById(id).then(data=> {
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

  Environment.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
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
    Environment.findByIdAndRemove(id).then(data => {
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