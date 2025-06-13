import { useEffect, useState } from "react";
import API from "../utils/api";
import { Campaign } from "../types";
import CampaignCard from "../components/CampaignCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/campaigns");
        setCampaigns(res.data);
        setError(null); // clear any previous error
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading campaigns...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : campaigns.length === 0 ? (
          <p className="text-center text-gray-600">No campaigns found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {campaigns.map((c) => (
              <CampaignCard key={c._id} campaign={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
