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
    mode: "onSubmit",
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
          <label className="form-label">
            Email*
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
            className="form-input"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-4 relative">
          <label className="form-label">
            Password*
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
            className="form-input pr-12"
            placeholder="Passcode"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 mb-6 text-xs px-1">
          <span className="text-gray-500 font-medium">
            Having trouble in sign in?
          </span>
          <Link
            to="/forgot-password"
            className="font-bold text-gray-900 hover:text-app-primary transition-colors"
          >
            Recover
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5bb6ea] text-white py-3.5 rounded-xl font-bold hover:bg-[#4a96c4] hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg hover:shadow-app-primary/30 text-sm"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
