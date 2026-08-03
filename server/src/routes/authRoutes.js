import express from "express";
import { signup, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    userId: req.userId,
  });
});

export default router;