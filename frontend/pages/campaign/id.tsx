import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API from "../../utils/api";
import { Campaign } from "../../types";
import Navbar from "../../components/Navbar";

export default function CampaignDetails() {
  const { id } = useRouter().query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    if (!id) return;
    API.get(`/campaigns/${id}`).then((res) => setCampaign(res.data));
  }, [id]);

  if (!campaign) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{campaign.title}</h1>
        <p className="mb-4">{campaign.description}</p>
        <p className="mb-2">Raised ₹{campaign.currentAmount} of ₹{campaign.goalAmount}</p>
      </div>
    </div>
  );
}
