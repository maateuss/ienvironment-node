require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: process.env.CORSORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (request, response) => {
    console.log("get on '/'");
    response.json({message: "Hello World"});

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server rodando na porta ${PORT}`);
});