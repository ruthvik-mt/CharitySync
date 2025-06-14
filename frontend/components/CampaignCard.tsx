import { useState, useEffect } from "react";
import { Campaign } from "../types";
import api from "../utils/api";

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);

  const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(Number(donationAmount))) return;

    try {
      await api.donateToCampaign(campaign._id, Number(donationAmount));
      setDonationSuccess(true);
      setDonationAmount("");
      setTimeout(() => setDonationSuccess(false), 3000); // Hide after 3s
    } catch (err) {
      console.error("Donation failed", err);
    }
  };

return (
  <div className="border p-4 rounded shadow-md relative">
    <h2 className="font-bold text-xl mb-2">{campaign.title}</h2>
    <p className="mb-2">{campaign.description.slice(0, 100)}...</p>
    <div className="bg-gray-200 h-3 w-full rounded mb-2">
      <div className="w-full max-w-full bg-gray-300 h-3 rounded overflow-hidden">
        <div
          className="bg-green-500 h-3 rounded transition-all duration-700 ease-in-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
    <p className="text-sm">₹{campaign.currentAmount} raised of ₹{campaign.goalAmount}</p>
    <button
      onClick={() => setShowModal(true)}
      className="mt-2 text-blue-600 underline"
    >
      View Details
    </button>

    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
          <h3 className="text-2xl font-bold mb-4">{campaign.title}</h3>

          {campaign.imageUrl && (
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="mb-4 rounded w-full max-h-60 object-cover"
            />
          )}

          <p className="mb-4">{campaign.description}</p>
          <p className="mb-2 font-semibold">Goal: ₹{campaign.goalAmount}</p>
          <p className="mb-2">Raised: ₹{campaign.currentAmount}</p>

          <div className="w-full bg-gray-200 h-4 rounded mb-4">
            <div
              className="bg-green-500 h-3 rounded transition-all duration-700 ease-in-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {isLoggedIn ? (
            <>
              <input
                type="number"
                placeholder="Enter amount (₹)"
                className="w-full border p-2 mb-3 rounded"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <button
                onClick={handleDonate}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-3"
              >
                Donate Now
              </button>
              {donationSuccess && (
                <p className="text-green-600 text-center">Donation successful 🎉</p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-600 italic mb-4">
              Please log in to donate.
            </p>
          )}

          <button
            onClick={() => {
              setShowModal(false);
              setDonationSuccess(false);
              setDonationAmount("");
            }}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
          >
            ×
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default CampaignCard;
