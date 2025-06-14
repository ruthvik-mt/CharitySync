import { Request, Response } from "express";
import Donation from "../models/Donation";
import Campaign from "../models/Campaign";
import User from "../models/User";

// ✅ Get all donations
export const getAllDonations = async (_req: Request, res: Response) => {
  try {
    const donations = await Donation.find()
      .populate("user", "name email")
      .populate("campaign", "title");
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donations", error: err });
  }
};

// ✅ Get admin dashboard stats
export const getStats = async (_req: Request, res: Response) => {
  try {
    const totalAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalCampaigns = await Campaign.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalDonations = await Donation.countDocuments();

    res.status(200).json({
      totalAmount: totalAmount[0]?.total || 0,
      totalCampaigns,
      totalUsers,
      totalDonations,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get stats", error: err });
  }
};

// ✅ Get donations for a specific campaign
export const getCampaignDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find({ campaign: req.params.id })
      .populate("user", "name email");
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to get campaign donations", error: err });
  }
};

export const getPendingCampaigns = async (_req: Request, res: Response) => {
  try {
    const pending = await Campaign.find({ approved: false });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: "Failed to get pending campaigns", error: err });
  }
};

export const approveCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const c = await Campaign.findById(req.params.id);
    if (!c) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    c.approved = true;
    await c.save();

    res.json({ message: "Approved", campaign: c });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve campaign", error: err });
  }
};
