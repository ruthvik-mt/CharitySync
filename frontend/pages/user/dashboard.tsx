"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Donation {
  _id: string;
  amount: number;
  campaign: { title: string };
  createdAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await api.getUserProfile();
        setUser(userRes);

        const donationsRes = await api.getUserDonations();
        setDonations(donationsRes);
      } catch (err) {
        console.error(err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">👤 User Dashboard</h1>

        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">My Donations</h2>
          {donations.length === 0 ? (
            <p>No donations yet.</p>
          ) : (
            <ul className="space-y-2">
              {donations.map((d) => (
                <li key={d._id} className="border-b pb-2">
                  <strong>₹{d.amount}</strong> to <em>{d.campaign.title}</em> on{" "}
                  {new Date(d.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
