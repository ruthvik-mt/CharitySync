import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", protect, getUserProfile);

export default router;
