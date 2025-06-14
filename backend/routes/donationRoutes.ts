import express from 'express';
import { createDonation, getAllDonations, getUserDonations } from '../controllers/donationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/:campaignId', protect, createDonation);           // Donate to campaign
router.get('/', protect, getAllDonations);                      // Admin view
router.get('/user', protect, getUserDonations);                 // User history

export default router;
