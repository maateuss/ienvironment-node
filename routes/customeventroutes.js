module.exports = app => {
    const customevent = require("../controllers/customeventcontroller.js");
    const validator = require("../config/jwtvalidator.js");

    var router = require("express").Router();

    router.post("/",validator.validate, customevent.create);
    router.get("/",validator.validate, customevent.findAll);
    router.get("/byid/:id",validator.validate, customevent.findOne);
    router.put("/:id",validator.validate, customevent.update);
    router.delete("/:id",validator.validate, customevent.delete);

    app.use('/api/customevents', router);
}
