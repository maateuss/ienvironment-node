const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.js")(mongoose);
db.equipments = require("./equipment.js")(mongoose);
db.environments = require("./environment.js")(mongoose);
db.customevents = require("./customevent.js")(mongoose);
module.exports = db;