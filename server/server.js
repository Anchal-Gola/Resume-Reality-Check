import dns from "node:dns";

dns.setServers(["10.130.108.12"]);

import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

console.log("Server file is running...");

const PORT = 8001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});