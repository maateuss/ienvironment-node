//interdependencias

var assert = require('assert')
const messageController = require("./controllers/messagecontroller.js");

var result = messageController.beautify(data);


assert.strictEqual(result, null);