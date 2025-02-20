import mongoose from "mongoose";

import isProduction from "@/utils/isProduction";

const HOST = process.env.MONGODB_HOST || "";
const PORT = process.env.MONGODB_PORT || 0;
const DB = process.env.MONGODB_DB || "";
const PWD = process.env.PWD || "";

/**
 * Establishes a connection to a MongoDB database using Mongoose.
 * 
 * The connection URI is constructed based on the environment. If the environment
 * is not production, the URI will exclude authentication credentials.
 * 
 * The function sets up event listeners for the Mongoose connection to log
 * connection status changes (connected, error, disconnected).
 * 
 * @async
 * @function connect
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 * @throws Will throw an error if the connection attempt fails.
 */
const connect = async () => {
  let URI = `mongodb://${DB}:${PWD}@${HOST}:${PORT}/${DB}`;
  if (!isProduction) {
    URI = `mongodb://${HOST}:${PORT}/${DB}`;
  }

  try {
    mongoose.connection.on("connected", () => {
      console.log("[mongoose] Connected");
    });

    mongoose.connection.on("error", (error) => {
      console.error("[mongoose] Error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("[mongoose] Disconnected");
    });

    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000,
      autoCreate: true,
    });
  } catch (error) {
    console.error("[mongoose] Connecting error:", error);
  }
};

export default connect;
