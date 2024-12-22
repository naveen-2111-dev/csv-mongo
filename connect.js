const mongoose = require("mongoose");
const idea = require("./schema/recipe");
require("dotenv").config();

const connectToDB = () => {
  const URI = process.env.DATABASE_URI;

  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log("Error connecting to MongoDB:", err));

  return {
    idea,
  };
};

module.exports = connectToDB;
