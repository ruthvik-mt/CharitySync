// import { useState, FormEvent } from "react";
// import { useRouter } from "next/router";
// import API from "../../utils/api";
// import { saveToken } from "../../utils/auth";
// import Navbar from "../../components/Navbar";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       saveToken(res.data.token);
//       router.push("/");
//     } catch (err) {
//       console.error("Login error:", err); // ✅ Using the error so ESLint doesn't complain
//       alert("Login failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <form className="max-w-md mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold">Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//     </>
//   );
// }

import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api"; // ✅ Use the custom API wrapper
import { saveToken } from "../../utils/auth";
import Navbar from "../../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.loginUser({ email, password });

      if (res?.token) {
        saveToken(res.token);
        router.push("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <form className="max-w-md mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </>
  );
}
