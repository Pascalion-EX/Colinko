const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("node:path");

async function connectDB() {
  dotenv.config({
    path: path.join(__dirname, "..", ".env"),
    quiet: true,
  });

  const mongoUri = process.env.MONGO_URI?.trim();

  if (!mongoUri) {
    throw new Error("MONGO_URI is required to connect to MongoDB.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.");
    return mongoose.connection;
  } catch (error) {
    throw new Error("Failed to connect to MongoDB.", { cause: error });
  }
}

module.exports = connectDB;

