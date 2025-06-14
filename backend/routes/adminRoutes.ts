import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware";
import { getAllDonations, getStats, getCampaignDonations, getPendingCampaigns, approveCampaign } from "../controllers/adminController";

const router = express.Router();

router.get("/donations", protect, isAdmin, getAllDonations);          // All donations
router.get("/stats", protect, isAdmin, getStats);                     // Summary stats
router.get("/campaign/:id", protect, isAdmin, getCampaignDonations); // Donations by campaign
router.get("/pending-campaigns", protect, isAdmin, getPendingCampaigns);
router.patch("/campaigns/:id/approve", protect, isAdmin, approveCampaign);

export default router;
