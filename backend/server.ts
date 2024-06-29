import "express-async-errors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Database Connection
import { connectToDB } from "./config/db";

// Middlewares
import errorMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import resHeadersMiddleware from "./middleware/response-Headers";

// Routers

// Authentication
import { authenticate } from "./middleware/authentication";

import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
); // Setting the CORS policy

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Setting the response headers
app.use(resHeadersMiddleware);

// All Server Routes

app.use(errorMiddleware); // Middleware to handle all thrown errors
app.use(notFoundMiddleware); // Middleware to handle Routes that are not there

// Function to start the server
export const startServer = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Connect to DB
      await connectToDB();

      console.log("\nDB connected !!!");

      server.listen(process.env.PORT, () => {
        console.log(
          `Server listening at http://localhost:${process.env.PORT}\n`
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Function to close the server
export const closeServer = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Close DB connection
      await mongoose.connection.close();

      console.log("\nDB connection closed");

      server.close();

      console.log("Server is closed\n");

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// When running the file directly
if (require.main === module) {
  startServer().catch((error) => {
    console.log(error);
    console.error("\nError starting the server : ", error.message);

    closeServer().catch((error) => {
      console.error("Error closing the server : ", error.message);
    });
  });
}

export default server;
