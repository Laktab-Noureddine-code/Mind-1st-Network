/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/authSlice";
import AuthLayout from "./AuthLayout";
import { authApi } from "@/lib/api";

function LoginPage() {
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const responseData = await authApi.login(data);

      // Dispatch login action to update Redux state
      dispatchEvent(setUser(responseData.user));
      navigate("/feed");
    } catch (error) {
      console.error("Login Error:", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 422)
      ) {
        setLoginError("These credentials do not match our records.");
      } else {
        setLoginError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log In"
      subtitle="Enter your valid credential for logging in"
      welcomeTitle="Welcome Back"
    >
      <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
        {loginError && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
            {loginError}
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-y-0 right-0 top-6 flex items-center pr-2 pointer-events-none text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <label className="block text-xs font-bold text-gray-900 mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 focus:ring-0 focus:border-app-primary transition-colors text-sm"
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-6 relative">
          <div className="absolute inset-y-0 right-0 top-6 flex items-center pr-2 pointer-events-none text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <label className="block text-xs font-bold text-gray-900 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 focus:ring-0 focus:border-app-primary transition-colors text-sm"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 mb-8 text-xs">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-gray-600 font-medium cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <Link
            to="/forgot-password"
            className="font-bold text-gray-900 hover:text-primary transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5bb6ea] text-white py-3 rounded-lg font-bold hover:bg-[#4a96c4] transition-colors shadow-md text-sm"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
