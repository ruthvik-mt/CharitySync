import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goalAmount: Number,
  currentAmount: {
    type: Number,
    default: 0
  },
  imageUrl: String,
}, { timestamps: true });

export default mongoose.model('Campaign', CampaignSchema);
