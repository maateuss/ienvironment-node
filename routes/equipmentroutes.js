module.exports = app => {
    const equipment = require("../controllers/equipmentcontroller.js");
    const validator = require("../config/jwtvalidator.js");

    var router = require("express").Router();

    router.post("/",validator.validate, equipment.create);
    router.get("/",validator.validate, equipment.findAll);
    router.get("/byid/:id",validator.validate, equipment.findOne);
    router.put("/:id",validator.validate, equipment.update);
    router.delete("/:id",validator.validate, equipment.delete);

    app.use('/api/equipments', router);
}
