module.exports = app => {
    const user = require("../controllers/usercontroller.js");

    var router = require("express").Router();

    router.post("/", user.create);
    router.get("/", user.findAll);
    router.get("/byid/:id", user.findOne);
    router.put("/:id", user.update);
    router.delete("/:id", user.delete);

    app.use('/api/users', router);
}
