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
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
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

        <div>
           <label className="block text-xs font-bold text-gray-900 mb-2">
             Email Address*
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5bb6ea] bg-white text-sm"
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-xs font-bold text-gray-900 mb-2">
            Password*
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              }
            })}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5bb6ea] bg-white text-sm"
             placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 mb-8 text-xs">
           <div className="flex items-center">
             <input
               id="remember-me"
               type="checkbox"
               className="h-4 w-4 text-[#5bb6ea] focus:ring-[#5bb6ea] border-gray-300 rounded cursor-pointer"
             />
             <label htmlFor="remember-me" className="ml-2 block text-gray-600 font-medium cursor-pointer">
               Remember me
             </label>
           </div>
           
             <Link
            to="/forgot-password"
            className="font-bold text-gray-900 hover:text-[#5bb6ea] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#fcd53f] text-gray-900 py-3 rounded-lg font-bold hover:bg-[#e6c239] transition-colors shadow-md text-sm"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-gray-900 hover:text-[#5bb6ea] transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
