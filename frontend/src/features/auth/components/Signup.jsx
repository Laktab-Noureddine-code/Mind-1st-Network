/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/authSlice";
import AuthLayout from "./AuthLayout";
import { authApi } from "@/lib/api";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const responseData = await authApi.register(data);

      dispatchEvent(setUser(responseData.user));
      navigate("/feed");
    } catch (error) {
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          const message = Array.isArray(serverErrors[field])
            ? serverErrors[field][0]
            : serverErrors[field];

          setError(field, {
            type: "server",
            message: message, // Assuming backend returns localized messages or we keep English for now
          });
        });
      }
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Enter your details to register your account"
    >
      <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <label className="block text-xs font-bold text-gray-900 mb-2">
            Full Name*
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className="form-input"
            placeholder="Mohammed Amine"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mt-3">
          <label className="block text-xs font-bold text-gray-900 mb-2">
            Business Email*
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
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-3">
          <label className="block text-xs font-bold text-gray-900 mb-2">
            Password*
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="form-input"
            placeholder="At least 8 characters"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-3">
          <label className="block text-xs font-bold text-gray-900 mb-2">
            Confirm Password*
          </label>
          <input
            type="password"
            {...register("password_confirmation", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="form-input"
            placeholder="Confirm your password"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#5bb6ea] text-white py-3 rounded-lg font-bold hover:bg-[#4a96c4] transition-colors shadow-md text-sm mt-8"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default SignUpPage;
