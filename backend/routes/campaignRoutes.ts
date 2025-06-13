// src/routes/campaignRoutes.ts
import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  deleteCampaign,
  updateCampaignAmount,
} from "../controllers/campaignController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Public Routes
router.get("/", getCampaigns);            // GET all campaigns - /api/campaigns
router.get("/:id", getCampaignById);      // GET campaign by ID - /api/campaigns/:id

// Protected Routes
router.post("/", authenticateToken, createCampaign);               // POST new campaign
router.patch("/:id/donate", authenticateToken, updateCampaignAmount); // Donate to campaign
router.delete("/:id", authenticateToken, deleteCampaign);          // Delete campaign

export default router;
