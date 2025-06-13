import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold text-xl">DonateNow</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
