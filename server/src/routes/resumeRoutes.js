import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Resume from "../models/Resume.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const resume = await Resume.create({
        userId: req.userId,
        originalName: req.file.originalname,
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      });

      res.status(201).json({
        message: "Resume uploaded successfully",
        resume,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;