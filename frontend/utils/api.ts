// utils/api.ts

import axios from "axios";

// ✅ Base API URL
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// ✅ Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to requests (if available)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Centralized error handler
const handleApiError = (error: any) => {
  console.error("API Error:", error?.response?.data || error.message);
  throw error;
};

// ✅ Interfaces
export interface Campaign {
  _id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  imageUrl?: string;
  approved: boolean;
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

// ✅ API Functions
const api = {
  // Auth
  registerUser: async (userData: User) => {
    try {
      const res = await apiClient.post("/api/auth/register", userData);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  loginUser: async (credentials: { email: string; password: string }) => {
    try {
      const res = await apiClient.post("/api/auth/login", credentials);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getUserProfile: async () => {
    try {
      const res = await apiClient.get("/api/auth/profile");
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Campaigns
  fetchCampaigns: async () => {
    try {
      const res = await apiClient.get("/api/campaigns");
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  fetchCampaignById: async (id: string) => {
    try {
      const res = await apiClient.get(`/api/campaigns/${id}`);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createCampaign: async (data: Partial<Campaign>) => {
    try {
      const res = await apiClient.post("/api/campaigns", data);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteCampaign: async (id: string) => {
    try {
      const res = await apiClient.delete(`/api/admin/campaigns/${id}`);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Donations
  donateToCampaign: async (campaignId: string, amount: number) => {
    try {
      const res = await apiClient.post(`/api/donations/${campaignId}`, { amount });
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getUserDonations: async () => {
    try {
      const res = await apiClient.get("/api/donations/user");
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Admin
  getAdminStats: async () => {
    try {
      const res = await apiClient.get("/api/admin/stats");
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getAllDonations: async () => {
    try {
      const res = await apiClient.get("/api/admin/donations");
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getCampaignDonationStats: async () => {
    try {
      const res = await apiClient.get("/api/admin/campaign-stats");
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Charity Submission
  submitCharityCampaign: async (data: Record<string, any>) => {
    try {
      const res = await apiClient.post("/api/campaigns/submit-charity", data);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getPendingCampaigns: async () => {
    try {
      const res = await apiClient.get("/api/admin/pending-campaigns");
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  approveCampaign: async (id: string) => {
    try {
      const res = await apiClient.patch(`/api/admin/campaigns/${id}/approve`);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getCurrentUser: async () => {
  try {
    const res = await apiClient.get("/api/auth/profile"); // or "/api/auth/me"
    return res.data; // should include role
  } catch (error) {
    handleApiError(error);
  }
},
  isAdmin: async () => {
    try {
      const res = await apiClient.get("/api/auth/is-admin");
      return res.data; // should return true/false
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default api;
