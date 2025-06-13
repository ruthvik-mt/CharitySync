import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import API from "../../utils/api";
import { saveToken } from "../../utils/auth";
import Navbar from "../../components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      saveToken(res.data.token);
      router.push("/");
    } catch (err) {
      console.error("Registration error:", err); // ✅ Using the error to satisfy linter
      alert("Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <form className="max-w-md mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Register</h1>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </>
  );
}
