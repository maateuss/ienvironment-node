//dependencias


require('dotenv').config();
var assert = require('assert')
const messageController = require("./controllers/messagecontroller.js");


//preparação dos dados

var yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1);

var data =  new Object({
            ambienteId: '34',
            start: yesterday, 
            end: new Date()
        
     })


//execução do metodo a ser testado

var result = messageController.BuildQuery(data);

//analise do resultado

describe('messagecontroller', function() {
    describe('#buildQuery', function() {
        //primeiro elemento de analise
        it('deve retornar 34 na propriedade query.ambienteid', function (){
            assert.equal(result.query.ambienteId, "34");
        })

        //segundo elemento de analise
        it('deve possuir um maior enddatetime que startdatetime', function (){
            assert.ok(result.query.datetime.$gte < result.query.datetime.$lte)
        })
    })
})








// const db = require("./models/index");
// db.mongoose.connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to the mongo")
// }).catch(() => {
//     console.log("Cannot connect to the mongo", err);
//     process.exit();
// });

// const messageController = require("./controllers/messagecontroller.js");

// let fakeresponse = class FakeResponse {
//     static send(data) {
//         console.log(data);
//         var results = Array.from(data);
//         console.log(results.length);
//     }
//     static status(number) {
//         return this;
//     };
// }

// class FakeRequest {
//     constructor(query) {
//         this.body = query
//     }

// }

// var today = new Date();

// var yesterday = new Date()
// yesterday.setDate(yesterday.getDate() - 1);

// var tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);


// let fakerequest = new FakeRequest({
//     query: {
//         'ambienteId': '34',
//         datetime: { $gte: ConvertDate(yesterday), $lte: today }
//     }
// });

// let fafakerequest = new Object({
//     body: {
//         ambienteId: '34',
//         start: yesterday, //var yesterday = new Date()
//         end: new Date()
//     }
// })


// //console.log(fakerequest.body.query)
// console.log(fafakerequest.body);
// //fafakerequest.body = BuildQuery(fafakerequest.body)
// messageController.findAll(fafakerequest, fakeresponse);


// function ConvertDate(dateToBeConverted) {
//     var dd = String(dateToBeConverted.getDate()).padStart(2, '0');
//     var mm = String(dateToBeConverted.getMonth() + 1).padStart(2, '0');
//     var yyyy = dateToBeConverted.getFullYear();

//     return (mm + '-' + dd + '-' + yyyy);
// }

// function BuildQuery(query) {
//     try {

//         if (!query.ambienteId) {
//             return { success: false };
//         }
//         if (!query.start || !query.end) {
//             return { success: false, message: "start/end is required" }
//         }
//         var startDate = Date.parse(query.start);
//         var endDate = Date.parse(query.end);

//         return {
//             query: {
//                 'ambienteId': query.ambienteId,
//                 datetime: { $gte: startDate, $lte: endDate }
//             }
//         }

//     }
//     catch (err) {
//         console.error(err)
//         return { success: false };
//     }

// }