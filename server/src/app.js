import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-reality-check-dusky.vercel.app",
  "https://resume-reality-check-gk88f8ryl-anshikagola45-3597s-projects.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/test", (req, res) => {
  res.send("Test route works");
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;