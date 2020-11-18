const db = require("../models");
const File = db.file;

exports.create = async (req, res) => {
  console.log(req.file);

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const { originalname: name, size, key, location: url = "" } = req.file;

  const file = await File.create({
    name,
    size,
    key,
    url,
  });

  return res.json(file);
};

exports.findAll = async (req, res) => {
  const files = await File.find();

  return res.json(files);
};


exports.getImageDataById = async(id) =>{
  const file = await File.findById(id);
  
  var parsed = file.toString().replace("_", "");

  return file;
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  const file = await File.findById(id);

  await file.remove();

  return res.send();
};
