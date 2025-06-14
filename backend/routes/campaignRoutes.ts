// src/routes/campaignRoutes.ts
import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  deleteCampaign,
  updateCampaignAmount,
  submitCharityCampaign,
} from "../controllers/campaignController";
import { protect, isAdmin, } from "../middleware/authMiddleware";

const router = express.Router();

// Public Routes
router.get("/", getCampaigns);                  // GET all campaigns - /api/campaigns

// Place static routes before dynamic ones
router.post("/submit-charity", submitCharityCampaign);

router.get("/:id", getCampaignById);            // GET campaign by ID - /api/campaigns/:id

// Protected Routes
router.post("/", protect, createCampaign);                    // POST new campaign
router.patch("/:id/donate", protect, updateCampaignAmount);   // Donate to campaign
router.delete("/:id", protect, isAdmin, deleteCampaign); 

   // Delete campaign (admin only)

export default router;
