// pages/campaign/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { isLoggedIn } from "../../utils/auth";

const CampaignDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) fetchCampaign();
  }, [id]);

  const fetchCampaign = async () => {
    try {
      const data = await api.fetchCampaignById(id as string);
      setCampaign(data);
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    if (!donationAmount || isNaN(Number(donationAmount))) {
      setMessage("Please enter a valid donation amount.");
      return;
    }

    try {
      await api.donateToCampaign(campaign._id, Number(donationAmount));
      setMessage("Thank you for your donation!");
      setDonationAmount("");
      fetchCampaign(); // refresh amount
    } catch (err) {
      console.error("Donation error:", err);
      setMessage("Donation failed. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!campaign) return <p className="text-center mt-10">Campaign not found.</p>;

  const progress = Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>

      {campaign.imageUrl && (
        <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-64 object-cover mb-4 rounded" />
      )}

      <p className="text-gray-700 mb-4">{campaign.description}</p>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Goal: ₹{campaign.goalAmount} &nbsp; | &nbsp; Raised: ₹{campaign.currentAmount}
        </p>
        <div className="w-full bg-gray-200 rounded h-4 overflow-hidden mt-1">
          <div className="bg-green-500 h-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-right text-gray-600 mt-1">{progress}% funded</p>
      </div>

      {isLoggedIn() ? (
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
            Donate Now
          </button>
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </div>
      ) : (
        <p className="text-sm text-gray-600 mb-6">
          Please <a href="/auth/login" className="text-blue-600 underline">log in</a> to donate.
        </p>
      )}

      <button
        onClick={() => router.back()}
        className="mt-4 text-sm text-blue-500 underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default CampaignDetails;
