const db = require("../models");
const Messages = db.messages;

exports.findAll= async (req, res) => {
    var result = await getData({});
    if(result.success){
        res.send(result.data)
    }else{
        res.status(500).send({
            message: result.err.message || "Some error occurred."
        });
    }
};


async function getData(query) {
    try{
        var data = await Messages.find(query).exec();
        return {success: true, data: data};
    }
    catch(err) { 
        return {success: false, err: err}; 
    }
    
}