import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-reality-check-dusky.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // Allow your Vercel Resume Reality Check deployments
      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("resume-reality-check")
      ) {
        return callback(null, true);
      }

      // Allow known production URL
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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