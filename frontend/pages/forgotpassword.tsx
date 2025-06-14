export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        <p className="text-center text-gray-600 mb-4">
          Please enter your email address to receive a password reset link.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
