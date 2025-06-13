import { useEffect, useState } from "react";
import API from "../utils/api";
import { Campaign } from "../types";
import CampaignCard from "../components/CampaignCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/campaigns");
      setCampaigns(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <CampaignCard key={c._id} campaign={c} />
        ))}
      </div>
    </div>
  );
}
