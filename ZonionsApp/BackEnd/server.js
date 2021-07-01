const express = require("express");
const cors = require("cors");
var router = express.Router();
const cookie = require("cookie-parser");
// create express app
const app = express();

// parse requests of content-type - application/json
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

//DB
const dbConfig = require("./config/db.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

//-----other origin from which we can load resource

var corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookie());

//const admin =
require("./routes/rest.routes.js")(app);
require("./routes/admin.routes.js")(app);
//pp.use('./admin.routes',a)

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
