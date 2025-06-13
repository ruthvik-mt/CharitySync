// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold">DonateNow</div>
          <div className="space-x-6 hidden md:flex">
            <Link href="/" className="hover:text-gray-300 transition">Home</Link>
            <Link href="/auth/login" className="hover:text-gray-300 transition">Login</Link>
            <Link href="/auth/register" className="hover:text-gray-300 transition">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
