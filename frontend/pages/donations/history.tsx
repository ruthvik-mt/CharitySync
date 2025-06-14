// pages/donations/history.tsx

import { useEffect, useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";

interface Donation {
  _id: string;
  amount: number;
  createdAt: string;
  campaign: {
    title: string;
  };
}

export default function DonationHistory() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getUserDonations();
        setDonations(data);
      } catch (err) {
        setError("Failed to load donation history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Donation History</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && donations.length === 0 && <p>No donations yet.</p>}

        {donations.map((donation) => (
          <div
            key={donation._id}
            className="border rounded p-4 mb-4 shadow-sm bg-white"
          >
            <p className="font-semibold">
              Campaign: {donation.campaign.title}
            </p>
            <p>Amount: ₹{donation.amount}</p>
            <p className="text-sm text-gray-500">
              Date: {new Date(donation.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
