// "use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import { saveToken } from "../../utils/auth";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.loginUser({ email, password });

      if (res?.token) {
        saveToken(res.token);
        router.push("/"); // Redirect to home/dashboard
      } else {
        setError("Login failed: Invalid server response.");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid credentials.";
      setError(msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot password link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => router.push("/forgotpassword")}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
