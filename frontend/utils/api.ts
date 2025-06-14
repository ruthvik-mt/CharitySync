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

const api = {
  // ✅ Campaign APIs
  fetchCampaigns: async () => {
    try {
      const response = await apiClient.get("/api/campaigns");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  fetchCampaignById: async (id: string) => {
    try {
      const response = await apiClient.get(`/api/campaigns/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createCampaign: async (campaignData: Partial<Campaign>) => {
    try {
      const response = await apiClient.post("/api/campaigns", campaignData);
      return response.data;
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

  // ✅ Donation APIs
  donateToCampaign: async (campaignId: string, amount: number) => {
    try {
      const response = await apiClient.post(`/api/donations/${campaignId}`, { amount });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getUserDonations: async () => {
    try {
      const response = await apiClient.get("/api/donations/user");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // ✅ Auth APIs
  registerUser: async (userData: User) => {
    try {
      const response = await apiClient.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  loginUser: async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiClient.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getUserProfile: async () => {
    try {
      const response = await apiClient.get("/api/auth/profile");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // ✅ Admin APIs
  getAdminStats: async () => {
    try {
      const response = await apiClient.get("/api/admin/stats");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getAllDonations: async () => {
    try {
      const response = await apiClient.get("/api/admin/donations");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getCampaignDonationStats: async () => {
    try {
      const response = await apiClient.get("/api/admin/campaign-stats");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // ✅ Charity Campaign Submission APIs
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
};

export default api;
