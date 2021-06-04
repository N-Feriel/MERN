const express = require("express");
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

const users = require("./routes/api/users");
const register = require("./routes/api/register");
const event = require("./routes/api/events");
const auth = require("./routes/api/auth");
const notification = require("./routes/api/notification");
const error = require("./middleware/error");

connectDB();

//Use route
app.use("/api/users", users);
app.use("/api/register", register);
app.use("/api/event", event);
app.use("/api/auth", auth);
app.use("/api/notification", notification);

app.use(error);

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
