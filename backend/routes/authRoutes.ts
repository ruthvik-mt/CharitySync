import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", authenticateToken, getUserProfile);

export default router;
