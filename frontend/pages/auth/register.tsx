// "use client";

// import { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../utils/api";
// import { saveToken } from "../../utils/auth";
// import Navbar from "../../components/Navbar";

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       const res = await api.registerUser({ name, email, password });

//       if (res?.token) {
//         saveToken(res.token);
//       }

//       setSuccess("User registered successfully!");
//       setTimeout(() => {
//         router.push("/");
//       }, 1500);
//     } catch (err: any) {
//       const msg = err?.response?.data?.message || "Registration failed.";
//       setError(msg);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4"
//         >
//           <h2 className="text-2xl font-semibold text-center">Register</h2>

//           {success && (
//             <p className="text-sm text-green-600 text-center">{success}</p>
//           )}
//           {error && (
//             <p className="text-sm text-red-500 text-center">{error}</p>
//           )}

//           <input
//             type="text"
//             placeholder="Name"
//             className="border border-gray-300 p-2 rounded w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="border border-gray-300 p-2 rounded w-full"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="border border-gray-300 p-2 rounded w-full"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import { saveToken } from "../../utils/auth";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Password Validations
  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const passwordStrength =
    [isLengthValid, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean)
      .length;

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
      case 3:
        return "Medium";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const getStrengthColor = () => {
    switch (getStrengthLabel()) {
      case "Weak":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Strong":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (passwordStrength < 4) {
      setError("Password does not meet all security requirements.");
      return;
    }

    try {
      const res = await api.registerUser({ name, email, password });

      if (res?.token) {
        saveToken(res.token);
      }

      setSuccess("User registered successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Registration failed.";
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
          <h2 className="text-2xl font-semibold text-center">Register</h2>

          {success && (
            <p className="text-sm text-green-600 text-center">{success}</p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-300 p-2 rounded w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Password Strength Meter */}
          <div className={`text-sm font-medium ${getStrengthColor()}`}>
            Strength: {getStrengthLabel()}
          </div>

          {/* Validation Checklist with Tooltip Explanations */}
          <div className="text-sm text-gray-700 space-y-1">
            <div
              className={isLengthValid ? "text-green-600" : "text-gray-500"}
              title="Password must be at least 8 characters long"
            >
              • At least 8 characters
            </div>
            <div
              className={hasUppercase ? "text-green-600" : "text-gray-500"}
              title="Include at least one uppercase letter (A-Z)"
            >
              • Contains an uppercase letter
            </div>
            <div
              className={hasNumber ? "text-green-600" : "text-gray-500"}
              title="Include at least one number (0-9)"
            >
              • Contains a number
            </div>
            <div
              className={hasSpecialChar ? "text-green-600" : "text-gray-500"}
              title="Include a special character like !@#$%^&*"
            >
              • Contains a special character
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

