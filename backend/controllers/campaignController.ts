import { Request, Response } from 'express';
import Campaign from '../models/Campaign';

// Create a new campaign
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, goalAmount, imageUrl } = req.body;

    if (!title || !description || !goalAmount) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    const newCampaign = new Campaign({
      title,
      description,
      goalAmount,
      imageUrl,
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create campaign', error });
  }
};

// Get all campaigns
export const getCampaigns = async (_req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch campaigns', error });
  }
};

// Get a single campaign by ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error });
  }
};

// Delete a campaign
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Campaign.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete campaign', error });
  }
};

// Update campaign progress
export const updateCampaignAmount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }

    campaign.currentAmount += amount;
    await campaign.save();

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign amount', error });
  }
};
