import { Request, Response } from 'express';
import Donation from '../models/Donation';
import Campaign from '../models/Campaign';

// Create a new donation
export const createDonation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const { campaignId } = req.params;
    const userId = req.user?.id;

    if (!amount || amount <= 0) {
      res.status(400).json({ message: 'Invalid donation amount' });
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
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }

    campaign.currentAmount += amount;
    await campaign.save();

    res.status(201).json({ message: 'Donation successful', donation: savedDonation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process donation', error });
  }
};

// Get all donations (Admin)
export const getAllDonations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const donations = await Donation.find()
      .populate('campaign', 'title')
      .populate('donor', 'name email');
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations', error });
  }
};

// Get donations for current user
export const getUserDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const donations = await Donation.find({ donor: userId })
      .populate('campaign', 'title');
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user donations', error });
  }
};
