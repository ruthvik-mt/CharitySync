// pages/campaign/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Campaign } from "../../types";
import Navbar from "../../components/Navbar";

export default function CampaignDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const loadCampaign = async () => {
      try {
        const data = await api.fetchCampaignById(id);
        setCampaign(data);
        setError(null);
      } catch (err) {
        console.error("Error loading campaign:", err);
        setError("Campaign not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [id]);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(Number(donationAmount))) {
      setMessage("❌ Please enter a valid donation amount.");
      return;
    }

    try {
      await api.donateToCampaign(id as string, Number(donationAmount));
      setMessage("✅ Thank you for your donation!");
      setDonationAmount('');
      // Reload campaign to update progress
      const updated = await api.fetchCampaignById(id as string);
      setCampaign(updated);
    } catch (error) {
      console.error("Donation failed:", error);
      setMessage("❌ Donation failed. Are you logged in?");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading campaign...</div>;

  if (error || !campaign)
    return <div className="p-6 text-center text-red-600">{error || "Campaign not found."}</div>;

  const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
        <p className="text-gray-700 mb-4">{campaign.description}</p>

        <div className="bg-gray-200 h-4 w-full rounded mb-2">
          <div
            className="bg-green-500 h-4 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-lg font-semibold mb-4">
          ₹{campaign.currentAmount} raised of ₹{campaign.goalAmount}
        </p>

        {/* Donation Form */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Enter donation amount (₹)</label>
          <input
            type="number"
            className="border p-2 rounded w-full mb-2"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
          <button
            onClick={handleDonate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Donate
          </button>
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </div>

        <p className="text-sm text-gray-500">Campaign ID: {campaign._id}</p>
      </div>
    </div>
  );
}
