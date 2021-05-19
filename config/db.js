const mongoose = require("mongoose");
require("dotenv").config();

//DB config
//const db = require("./keys").mongoURI;

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
