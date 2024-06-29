import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * Connects to the MongoDB database.
 */

/* --------------------------------- DB Connection --------------------------------- */

export const connectToDB = async () => {
  // Construct the MongoDB connection URI using environment variables
  const dbUser = process.env.DB_USER || "";
  const dbPass = process.env.DB_PASS || "";
  const cluster = process.env.CLUSTER || "";
  const dbName = process.env.DB_NAME || "";
  const appName = process.env.APP_NAME || "";

  const mongoURI = `mongodb+srv://${dbUser}:${dbPass}@${cluster}mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${appName}`;

  // Connect to the MongoDB database
  await mongoose.connect(mongoURI, {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  });
};
