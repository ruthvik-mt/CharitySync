// import { useState, FormEvent } from "react";
// import { useRouter } from "next/router";
// import API from "../../utils/api";
// import { saveToken } from "../../utils/auth";
// import Navbar from "../../components/Navbar";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/register", { name, email, password });
//       saveToken(res.data.token);
//       router.push("/");
//     } catch (err) {
//       console.error("Registration error:", err); // ✅ Using the error to satisfy linter
//       alert("Registration failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <form className="max-w-md mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold">Register</h1>
//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-2 w-full"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
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
//         <button type="submit" className="bg-green-600 text-white p-2 rounded">
//           Register
//         </button>
//       </form>
//     </>
//   );
// }

// import { useState, FormEvent } from "react";
// import { useRouter } from "next/router";
// import api from "../../utils/api"; // ✅ Make sure this matches your actual file structure
// import { saveToken } from "../../utils/auth"; // Optional: only needed if you're saving JWT
// import Navbar from "../../components/Navbar";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault(); // ✅ Prevent full page reload on form submit

//     try {
//       const res = await api.registerUser({ name, email, password });

//       // Optional: Save token if your API returns one
//       if (res?.token) {
//         saveToken(res.token);
//       }

//       console.log("User registered successfully", res);
//       router.push("/"); // ✅ Redirect after successful registration
//     } catch (err: any) {
//       console.error("Registration error", err);
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <form className="max-w-md mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold">Register</h1>

//         {error && <p className="text-red-500">{error}</p>}

//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-2 w-full"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
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
//         <button type="submit" className="bg-green-600 text-white p-2 rounded">
//           Register
//         </button>
//       </form>
//     </>
//   );
// }


import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { saveToken } from "../../utils/auth"; // Optional: needed only if your backend returns JWT
import Navbar from "../../components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.registerUser({ name, email, password });

      if (res?.token) {
        saveToken(res.token); // Optional: store token in localStorage
      }

      setSuccess("User registered successfully");
      setError(null);

      // Redirect after short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      console.error("Registration error", err);
      setError(err.response?.data?.message || "Registration failed");
      setSuccess(null);
    }
  };

  return (
    <>
      <Navbar />
      <form className="max-w-md mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Register</h1>

        {/* Show success or error message */}
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

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
