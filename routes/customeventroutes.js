module.exports = app => {
    const customevent = require("../controllers/customeventcontroller.js");

    var router = require("express").Router();

    router.post("/", customevent.create);
    router.get("/", customevent.findAll);
    router.get("/byid/:id", customevent.findOne);
    router.put("/:id", customevent.update);
    router.delete("/:id", customevent.delete);

    app.use('/api/customevents', router);
}
