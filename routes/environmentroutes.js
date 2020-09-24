module.exports = app => {
    const environment = require("../controllers/environmentcontroller.js");

    var router = require("express").Router();

    router.post("/", environment.create);
    router.get("/", environment.findAll);
    router.get("/byid/:id", environment.findOne);
    router.put("/:id", environment.update);
    router.delete("/:id", environment.delete);

    app.use('/api/environments', router);
}
