// components/Navbar.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold">DonateNow</div>
          <div className="space-x-6 hidden md:flex items-center">
            <Link href="/" className="hover:text-gray-300 transition">Home</Link>

            {isLoggedIn ? (
              <>
                <Link href="/donations/history" className="hover:text-gray-300 transition">My Donations</Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 transition border border-white px-2 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-gray-300 transition">Login</Link>
                <Link href="/auth/register" className="hover:text-gray-300 transition">Register</Link>
                <Link href="/charity/submit" className="hover:text-gray-300 font-bold">Submit Charity Campaign</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
