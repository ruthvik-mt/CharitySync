import Link from "next/link";
import { Campaign } from "../types";

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="font-bold text-xl mb-2">{campaign.title}</h2>
      <p className="mb-2">{campaign.description}</p>
      <div className="bg-gray-200 h-3 w-full rounded mb-2">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>₹{campaign.currentAmount} raised of ₹{campaign.goalAmount}</p>
      <Link href={`/campaign/${campaign._id}`} className="text-blue-600 underline">
        View Details
      </Link>
    </div>
  );
};

export default CampaignCard;
