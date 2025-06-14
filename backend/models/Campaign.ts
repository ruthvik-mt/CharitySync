import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  imageUrl: { type: String },

  // Additional fields for charity-submitted campaigns:
  charityName: { type: String }, // Optional: Name of the charity (if public form)
  contactEmail: { type: String }, // For admin follow-up
  createdByCharity: { type: Boolean, default: false }, // Indicates public submission

  approved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);
