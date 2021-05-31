const express = require("express");
const users = require("./routes/api/users");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

// BodyPaser MiddleWare
// parse various different custom JSON types as JSON
app.use(express.json());

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to mongiise
const connectDB = require("./config/db");
const { resolve } = require("path");

connectDB();

//Use route
app.use("/api/users", users);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path, resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
