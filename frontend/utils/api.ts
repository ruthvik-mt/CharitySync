// // frontend/utils/api.ts
// import axios from "axios";

// // ✅ Proper base URL setup
// const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// // ✅ Create a reusable axios instance
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Optional: Handle and log API errors
// const handleApiError = (error: any) => {
//   console.error("API error:", error?.response?.data || error.message);
//   throw error;
// };

// // ✅ Interface (if needed for TypeScript, adjust as per your schema)
// export interface Campaign {
//   _id: string;
//   title: string;
//   description: string;
//   goal: number;
//   // Add other fields if needed
// }

// // ✅ API methods
// const api = {
//   // Get all campaigns
//   fetchCampaigns: async () => {
//     try {
//       const response = await apiClient.get("/api/campaigns");
//       return response.data;
//     } catch (error) {
//       handleApiError(error);
//     }
//   },

//   // Get a single campaign by ID
//   fetchCampaignById: async (id: string) => {
//     try {
//       const response = await apiClient.get(`/api/campaigns/${id}`);
//       return response.data;
//     } catch (error) {
//       handleApiError(error);
//     }
//   },
// };

// export default api;

// frontend/utils/api.ts
import axios from "axios";

// ✅ Base API URL
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// ✅ Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to requests (if present)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Error handler
const handleApiError = (error: any) => {
  console.error("API Error:", error?.response?.data || error.message);
  throw error;
};

// ✅ Types
export interface Campaign {
  _id: string;
  title: string;
  description: string;
  goal: number;
  // Add other fields if needed
}

export interface User {
  name: string;
  email: string;
  password: string;
}

// ✅ API methods
const api = {
  // 🟢 Get all campaigns
  fetchCampaigns: async () => {
    try {
      const response = await apiClient.get("/api/campaigns");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 🟢 Get a single campaign
  fetchCampaignById: async (id: string) => {
    try {
      const response = await apiClient.get(`/api/campaigns/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 🟢 Create a campaign (requires login)
  createCampaign: async (campaignData: Partial<Campaign>) => {
    try {
      const response = await apiClient.post("/api/campaigns", campaignData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 🟢 User registration
  registerUser: async (userData: User) => {
    try {
      const response = await apiClient.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 🟢 User login
  loginUser: async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiClient.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 🟢 Get user profile
  getUserProfile: async () => {
    try {
      const response = await apiClient.get("/api/auth/profile");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default api;
