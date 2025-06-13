import { useEffect, useState } from "react";
import api from "../utils/api";
import { Campaign } from "../types";
import CampaignCard from "../components/CampaignCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.fetchCampaigns()
      .then((data) => {
        setCampaigns(data);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.error("Caught error in Home component:", err);

        if (err.message && err.message.includes("Network Error")) {
          setError("Cannot connect to the server. Please ensure the backend is running and reachable.");
        } else if (err.response && err.response.status === 404) {
          setError("API endpoint not found. Please check API_BASE_URL configuration.");
        } else {
          setError("Failed to load campaigns. An unexpected error occurred.");
        }

        setCampaigns([]); // Clear campaigns on error
      })
      .finally(() => {
        setLoading(false); // Turn off loading state
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading campaigns...</p>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-100 border border-red-400 p-4 rounded-md mx-auto max-w-md">
            <h2 className="font-bold text-lg mb-2">Error</h2>
            <p>{error}</p>
            <p className="text-sm mt-2">Please check your network connection or try again later.</p>
          </div>
        ) : campaigns.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No campaigns found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {campaigns.map((c) => (
              <CampaignCard key={c._id} campaign={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
