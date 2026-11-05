"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaClock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGoogle,
  FaLock,
  FaShieldHalved,
  FaStar,
  FaTruck,
  FaUsers,
} from "react-icons/fa6";
import { loginSchema, loginSchemaType } from "@/schema/loginSchema";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  async function signin(values: loginSchemaType) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.ok === true) {
      toast.success("Login successfully", { position: "top-center" });
      window.location.href = res?.url || "/";
    } else {
      toast.error(res?.error || "Something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="container py-16 mx-auto px-4" id="login-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left side */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              alt="Fresh vegetables and fruits shopping cart illustration"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
            />

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaTruck className="text-primary-600 mr-2" />
                  Free Delivery
                </div>
                <div className="flex items-center">
                  <FaShieldHalved className="text-primary-600 mr-2" />
                  Secure Payment
                </div>
                <div className="flex items-center">
                  <FaClock className="text-primary-600 mr-2" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  Fresh<span className="text-gray-800">Cart</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            {/* Social (شكل بس) */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 hover:cursor-pointer border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FaGoogle className="text-red-500 text-lg" />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 hover:cursor-pointer border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FaFacebook className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">
                  Continue with Facebook
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(signin)} className="space-y-6">
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="Enter your email"
                        aria-invalid={fieldState.invalid}
                        className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          fieldState.invalid
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary-500 focus:ring-primary-100"
                        }`}
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    {fieldState.invalid && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Password
                      </label>
                      <Link
                        href="/forget-password"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        aria-invalid={fieldState.invalid}
                        className={`w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          fieldState.invalid
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary-500 focus:ring-primary-100"
                        }`}
                      />
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Keep me signed in (شكل بس) */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 accent-primary-600 border-2 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Keep me signed in
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:cursor-pointer hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                Sign In
              </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                New to FreshCart?
                <Link
                  href="/register"
                  className="text-primary-600 hover:text-primary-700 ms-2 font-semibold"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
              <div className="flex items-center">
                <FaLock className="mr-1" />
                SSL Secured
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                50K+ Users
              </div>
              <div className="flex items-center">
                <FaStar className="mr-1" />
                4.9 Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
