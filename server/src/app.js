
import express from "express";

import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/test", (req, res) => {
  res.send("Test route works");
});

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});


export default app;