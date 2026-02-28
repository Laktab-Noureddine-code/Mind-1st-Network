import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Mail } from "lucide-react";
import api from "@/lib/api";
import AuthLayout from "./AuthLayout";

function ForgetPassword() {
  const { Email } = useParams();
  const [email, setEmail] = useState(Email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/api/forgot-password", { email });
      setIsSuccess(true);
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address to receive a reset link"
    >
      <div className="w-full">
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-4 text-sm text-center">
            <p>
              If an account exists with the address <strong>{email}</strong>,
              you will receive an email containing a link to reset your
              password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-900 mb-1 ml-1 px-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-app-primary/20 focus:border-app-primary transition-colors text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full text-white py-3.5 rounded-xl font-bold transition-all shadow-md mt-6 text-sm ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-app-primary hover:bg-[#4a96c4] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-app-primary/30"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="text-xs font-bold text-gray-500 hover:text-app-primary transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}

export default ForgetPassword;
