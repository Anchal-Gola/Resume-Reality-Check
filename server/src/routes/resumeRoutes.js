import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Resume from "../models/Resume.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { analyzeResume } from "../services/resumeAnalysisService.js";
import { matchResumeWithJob } from "../services/jobMatchService.js";
import { searchJobs } from "../services/jobRequirementsService.js";

const router = express.Router();

// Upload and analyze resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const extractedText = await extractTextFromPDF(req.file.path);

      const analysis = analyzeResume(extractedText);

      const resume = await Resume.create({
        userId: req.userId,
        originalName: req.file.originalname,
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        extractedText,
        analysis,
      });

      res.status(201).json({
        message: "Resume uploaded successfully",
        resume,
        extractedText,
        analysis,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get user's resumes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Match resume with a specific job description
// Match resume with selected job role
router.post("/match-role", authMiddleware, async (req, res) => {
  try {
    const { resumeId, role } = req.body;

    if (!resumeId || !role) {
      return res.status(400).json({
        message: "Resume ID and role are required",
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const result = matchResumeWithJob(
      resume.extractedText,
      role
    );

    res.status(200).json({
      message: "Role matching completed",
      result,
    });
  } catch (error) {
    console.error("Role matching error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
});


// Match resume with job description
router.post("/match-job", authMiddleware, async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        message: "Resume ID and job description are required",
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const result = matchResumeWithJob(
      resume.extractedText,
      jobDescription
    );

    return res.status(200).json({
      message: "Job matching completed",
      result,
    });

  } catch (error) {
    console.error("Job matching error:", error);

    return res.status(500).json({
      message: error.message || "Job matching failed",
    });
  }
});

// Search job occupations using ESCO
router.get("/job-search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Job search query is required",
      });
    }

    const results = await searchJobs(query);

    res.status(200).json({
      results,
    });
  } catch (error) {
    console.error("Job search error:", error.message);

    res.status(500).json({
      message: "Unable to search jobs",
    });
  }
});
// Delete resume
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await Resume.deleteOne({
      _id: req.params.id,
      userId: req.userId,
    });

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;