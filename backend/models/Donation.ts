import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  donorName: String,
  amount: Number,
}, { timestamps: true });

export default mongoose.model('Donation', DonationSchema);
