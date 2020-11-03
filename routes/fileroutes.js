module.exports = (app) => {
  const file = require("../controllers/filecontroller");
  const validator = require("../config/jwtvalidator.js");
  const multer = require("multer");
  const multerConfig = require("../config/multer");

  var router = require("express").Router();

  router.post("/", multer(multerConfig).single("file"), file.create);
  router.get("/", file.findAll);
  router.delete("/:id", file.delete);

  app.use("/api/file", router);
};
