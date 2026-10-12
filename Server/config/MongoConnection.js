import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

async function connectDB() {
  dotenv.config({
    path: fileURLToPath(new URL("../.env", import.meta.url)),
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

export default connectDB;

