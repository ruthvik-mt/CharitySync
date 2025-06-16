"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .getCurrentUser()
      .then((res) => setUser(res))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            Donation Platform
          </Link>

          <div className="space-x-6 hidden md:flex items-center">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>

            {user ? (
              <>
                {/* Admin View */}
                {user.role === "admin" ? (
                  <Link
                    href="/admin/dashboard"
                    className="hover:text-gray-300 transition">
                     Dashboard
                  </Link>
                ) : (
                  <>
                    {/* Regular User View */}
                    <Link
                      href="/user/dashboard"
                      className="hover:text-gray-300 transition"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/donations/history"
                      className="hover:text-gray-300 transition"
                    >
                      My Donations
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 transition border border-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest View */}
                <Link
                  href="/auth/login"
                  className="hover:text-gray-300 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="hover:text-gray-300 transition"
                >
                  Register
                </Link>
                <Link
                  href="/charity/submit"
                  className="hover:text-gray-300 transition"
                >
                  Charity Campaign
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
