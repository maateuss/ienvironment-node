module.exports = app => {
    const user = require("../controllers/usercontroller.js");

    var router = require("express").Router();

    router.post("/", user.create);

    app.use('/api/users', router);
}
