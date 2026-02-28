import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import api from "@/lib/api";
import AuthLayout from "./AuthLayout";

function ResetPassword() {
  const navigate = useNavigate();
  const { token, email } = useParams(); // from URL /reset-password/:token/:email
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsSubmitting(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post("/api/reset-password", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle={`Enter a new password for ${email}`}
    >
      <div className="w-full">
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-4 text-sm text-center">
            Password reset successfully. Redirecting to login...
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
                htmlFor="password"
                className="block text-xs font-bold text-gray-900 mb-1 ml-1 px-1"
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-app-primary/20 focus:border-app-primary transition-colors text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="passwordConfirmation"
                className="block text-xs font-bold text-gray-900 mb-1 ml-1 px-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="passwordConfirmation"
                  type="password"
                  placeholder="********"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-app-primary/20 focus:border-app-primary transition-colors text-sm"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full text-white py-3.5 rounded-xl font-bold transition-all shadow-md mt-8 text-sm ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-app-primary hover:bg-[#4a96c4] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-app-primary/30"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
