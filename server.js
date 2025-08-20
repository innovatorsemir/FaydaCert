import app from "../app.js";        // your Express app
import connectDB from "../config/db.js";

// Connect to MongoDB
connectDB().catch(err => console.error(err));

// Export as serverless function
export default async function handler(req, res) {
  // Wait for MongoDB connection if needed
  app(req, res);
}
