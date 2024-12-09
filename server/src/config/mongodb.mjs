import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri =
  process.env.MONGODB_URL ||
  `mongodb+srv://nobledev:${encodeURIComponent(
    process.env.MONGODB_PSW
  )}@free-cluster.xucjn.mongodb.net/?retryWrites=true&w=majority&appName=free-cluster`;

const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    if (!db) {
      await client.connect();
      db = client.db("crypto-dashboard");
      console.log("Connected to database");
    }
    return db;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

export { connectDB };
