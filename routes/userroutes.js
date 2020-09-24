module.exports = app => {
    const user = require("../controllers/usercontroller.js");
    const validator = require("../config/jwtvalidator.js");
    var router = require("express").Router();

    router.post("/",validator.validate, user.create);
    router.get("/",validator.validate, user.findAll);
    router.get("/byid/:id",validator.validate, user.findOne);
    router.put("/:id",validator.validate, user.update);
    router.delete("/:id",validator.validate, user.delete);
    router.post("/login", user.login);

    app.use('/api/users', router);
}
