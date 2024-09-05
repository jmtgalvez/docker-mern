const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB } =
  process.env;

async function connectDB() {
  console.log("Connecting to database ...");
  await mongoose.connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
  );
  console.log("Connected to database ...");
}

module.exports = connectDB;
