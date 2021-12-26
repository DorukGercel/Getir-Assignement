const Mongoose = require("mongoose");
const {Logger} = require("../logger/Logger");

const db = Mongoose.connection;

db.once("open", () => {
  Logger.info("Successfully connected to MongoDB");
});

const connectDB = async () => {
  const { DB_URI } = process.env;
  Mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;