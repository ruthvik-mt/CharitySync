import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SubmitCharityCampaign = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    charityName: "",
    contactEmail: "",
    title: "",
    description: "",
    goalAmount: "",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/campaigns/submit-charity", {
        ...form,
        goalAmount: Number(form.goalAmount),
      });

      setMessage("Campaign submitted successfully. Awaiting approval.");
      setForm({
        charityName: "",
        contactEmail: "",
        title: "",
        description: "",
        goalAmount: "",
        imageUrl: ""
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 px-6 py-8 bg-white shadow-xl rounded-lg">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Submit Charity Campaign
      </h1>

      {message && (
        <div className="mb-4 p-3 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="charityName"
          placeholder="Charity Name"
          value={form.charityName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="contactEmail"
          type="email"
          placeholder="Contact Email"
          value={form.contactEmail}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="title"
          placeholder="Campaign Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
        <input
          name="goalAmount"
          type="number"
          placeholder="Goal Amount"
          value={form.goalAmount}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SubmitCharityCampaign;
