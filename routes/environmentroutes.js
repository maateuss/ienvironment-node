module.exports = (app) => {
  const environment = require("../controllers/environmentcontroller.js");
  const validator = require("../config/jwtvalidator.js");

  var router = require("express").Router();

    router.post("/",validator.validate, environment.create);
    router.get("/",validator.validate, environment.findAll);
    router.get("/actives",validator.validate, environment.findActives);
    router.get("/byid/:id",validator.validate, environment.findOne);
    router.put("/:id",validator.validate, environment.update);
    router.delete("/:id",validator.validate, environment.delete);

  app.use("/api/environments", router);
};
