const db = require("../models");
const Messages = db.messages;

exports.getChartData = async (req, res) => {
    var query;
    if(!req || !req.body){
        return res.status(500).send({message: "body is required"});
    }else{
        query = buildQuery(req.body).query;
    }
    var result = await getData(query);
    if(result.success){
        console.log(result.data);

        res.send(beautify(result.data))
    }else{
        res.status(500).send({
            message: result.err.message || "Some error occurred."
        });
    }
}

exports.findAll= async (req, res) => {
    var query;
    if(!req || !req.body){
        query = {};
    }else{
        query = buildQuery(req.body).query;
    }
    var result = await getData(query);
    if(result.success){
        console.log(result.data);

        res.send(beautify(result.data))
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

exports.Beautify = (data) => { return beautify(data) };
exports.BuildQuery = (data) => { return buildQuery(data) };

function beautify(data){
    var formattedData = data.map(entry => { return { sensorId: entry.sensorId, datetime: entry.datetime, value: entry.value } 
    })
    return formattedData;
}

function buildQuery(query) {
    try {

        if (!query.ambienteId) {
            return { success: false };
        }
        if (!query.start || !query.end) {
            return { success: false, message: "start/end is required" }
        }
        var startDate = Date.parse(query.start);
        var endDate = Date.parse(query.end);

        return {
            query: {
                'ambienteId': query.ambienteId,
                 datetime: { $gte: startDate, $lte: endDate }
            }
        }

    }
    catch (err) {
        console.error(err)
        return { success: false };
    }
}