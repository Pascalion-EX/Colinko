import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import mongoose from "mongoose";
import connectDB from "./config/MongoConnection.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)), quiet: true });

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Server is running." });
});

async function startServer() {
  const port = Number(process.env.PORT || 5000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  await connectDB();

  try {
    return await new Promise((resolve, reject) => {
      const server = app.listen(port, (error) => {
        if (error) {
          reject(error);
          return;
        }

        console.log(`Server is running on http://localhost:${port}`);
        resolve(server);
      });
      server.once("error", reject);
    });
  } catch (error) {
    await mongoose.disconnect();
    throw error;
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  startServer().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  });
}

export { app, startServer };
