import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";

interface Stats {
  totalUsers: number;
  totalCampaigns: number;
  totalAmount: number;
  totalDonations: number;
}

interface Donation {
  _id: string;
  amount: number;
  user: { name: string; email: string };
  campaign: { title: string };
  createdAt: string;
}

interface CampaignStats {
  _id: string;
  title: string;
  totalDonations: number;
  totalAmount: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [campaignStats, setCampaignStats] = useState<CampaignStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchAdminData = async () => {
  try {
    const user = await api.getCurrentUser();

    if (user.role !== "admin") {
      setError("Access denied. Admins only.");
      return;
    }

    const [statsRes, donationsRes, campaignStatsRes] = await Promise.all([
      api.getAdminStats(),
      api.getAllDonations(),
      api.getCampaignDonationStats(),
    ]);

    setStats(statsRes);
    setDonations(donationsRes);
    setCampaignStats(campaignStatsRes);
  } catch (err: any) {
    setError("Unauthorized or failed to load admin data");
  } finally {
    setLoading(false);
  }
};

    fetchAdminData();
  }, [router]);

  const filteredDonations = donations.filter(
    (d) =>
      d.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCampaign = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this campaign?");
    if (!confirmed) return;

    try {
      await api.deleteCampaign(id);
      setCampaignStats((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete campaign.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading admin dashboard...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="👥 Users" value={stats?.totalUsers} />
          <StatCard label="📁 Campaigns" value={stats?.totalCampaigns} />
          <StatCard label="💸 Donations" value={stats?.totalDonations} />
          <StatCard label="₹ Total Raised" value={`₹${stats?.totalAmount}`} />
        </div>

        {/* Donations Table */}
        <div className="bg-white border p-4 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">🧾 Recent Donations</h2>

          <input
            type="text"
            placeholder="Search by user or campaign..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 mb-4 w-full md:w-1/2 rounded"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Campaign</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((d) => (
                  <tr key={d._id} className="border-b">
                    <td className="px-4 py-2">{d.user.name}</td>
                    <td className="px-4 py-2">{d.campaign.title}</td>
                    <td className="px-4 py-2">₹{d.amount}</td>
                    <td className="px-4 py-2">{new Date(d.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign-wise Stats */}
        <div className="bg-white border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">📌 Campaign-wise Stats</h2>
          <div className="space-y-3">
            {campaignStats.map((c) => (
              <div key={c._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-sm text-gray-600">
                    {c.totalDonations} donations · ₹{c.totalAmount} raised
                  </p>
                </div>
                <button
                  className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
                  onClick={() => handleDeleteCampaign(c._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string | undefined }) {
  return (
    <div className="bg-white shadow-md rounded p-4 border text-center">
      <h2 className="text-lg text-gray-700">{label}</h2>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
