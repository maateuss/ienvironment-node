module.exports = app => {
    const message = require("../controllers/messagecontroller.js");
    const validator = require("../config/jwtvalidator.js");

    var router = require("express").Router();

    router.get("/", message.findAll);

    app.use('/api/messages', router);
}