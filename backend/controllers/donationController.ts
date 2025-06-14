import { Response } from 'express';
import Donation from '../models/Donation';
import Campaign from '../models/Campaign';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Create a new donation
export const createDonation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const { campaignId } = req.params;
    const userId = req.userId; // ✅ Corrected

    if (!amount || amount <= 0) {
      res.status(400).json({ message: 'Invalid donation amount' });
      return;
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }

    // Create and save donation
    const newDonation = new Donation({
      campaign: campaignId,
      donor: userId,
      amount,
    });

    const savedDonation = await newDonation.save();

    // Update campaign's currentAmount
    campaign.currentAmount += amount;
    await campaign.save();

    res.status(201).json({ message: 'Donation successful', donation: savedDonation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process donation', error });
  }
};

// Admin: Get all donations
export const getAllDonations = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const donations = await Donation.find()
      .populate('campaign', 'title')
      .populate('donor', 'name email');

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations', error });
  }
};

// User: Get their donations
export const getUserDonations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId; // ✅ Corrected
    const donations = await Donation.find({ donor: userId })
      .populate('campaign', 'title');

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user donations', error });
  }
};
