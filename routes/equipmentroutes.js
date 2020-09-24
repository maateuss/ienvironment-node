module.exports = app => {
    const equipment = require("../controllers/equipmentcontroller.js");

    var router = require("express").Router();

    router.post("/", equipment.create);
    router.get("/", equipment.findAll);
    router.get("/byid/:id", equipment.findOne);
    router.put("/:id", equipment.update);
    router.delete("/:id", equipment.delete);

    app.use('/api/equipments', router);
}
