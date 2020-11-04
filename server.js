require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/file", express.static(path.resolve(__dirname, "tmp", "uploads")));

const db = require("./models/index");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the mongo");
  })
  .catch(() => {
    console.log("Cannot connect to the mongo", err);
    process.exit();
  });

app.get("/", (request, response) => {
  console.log("get on '/'");
  response.json({ message: "Hello World" });
});

require("./routes/customeventroutes.js")(app);
require("./routes/environmentroutes.js")(app);
require("./routes/userroutes.js")(app);
require("./routes/equipmentroutes.js")(app);
require("./routes/messageroutes.js")(app);
require("./routes/fileroutes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
