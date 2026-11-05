"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaArrowLeft,
  FaEnvelope,
  FaKey,
  FaLock,
  FaShieldHalved,
} from "react-icons/fa6";

const API = "https://ecommerce.routemisr.com/api/v1/auth";

type Step = 1 | 2 | 3;

const steps = [
  { id: 1, icon: <FaEnvelope className="text-xs" /> },
  { id: 2, icon: <FaKey className="text-xs" /> },
  { id: 3, icon: <FaLock className="text-xs" /> },
] as const;

function errorMessage(e: unknown) {
  return axios.isAxiosError(e)
    ? e.response?.data?.message || "Something went wrong"
    : "Something went wrong";
}

const inputClass =
  "w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all";

const ForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function run(action: () => Promise<void>) {
    setLoading(true);
    try {
      await action();
    } catch (e) {
      toast.error(errorMessage(e), { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (step === 1) {
      run(async () => {
        const { data } = await axios.post(`${API}/forgotPasswords`, { email });
        toast.success(data.message || "Reset code sent", {
          position: "top-center",
        });
        setStep(2);
      });
    } else if (step === 2) {
      run(async () => {
        await axios.post(`${API}/verifyResetCode`, { resetCode: code });
        toast.success("Code verified", { position: "top-center" });
        setStep(3);
      });
    } else {
      run(async () => {
        await axios.put(`${API}/resetPassword`, { email, newPassword });
        toast.success("Password updated, please sign in", {
          position: "top-center",
        });
        router.push("/login");
      });
    }
  }

  const content = {
    1: {
      title: "Forgot Password?",
      subtitle: "No worries, we'll send you a reset code",
      button: "Send Reset Code",
    },
    2: {
      title: "Enter Reset Code",
      subtitle: `We sent a code to ${email}`,
      button: "Verify Code",
    },
    3: {
      title: "New Password",
      subtitle: "Choose a strong password for your account",
      button: "Reset Password",
    },
  }[step];

  return (
    <div className="container py-16 mx-auto px-4" id="forgot-password-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left side */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="w-full h-96 bg-linear-to-br from-primary-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-primary-100/50" />
              <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50" />
              <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50" />

              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <FaLock className="text-primary-600 text-4xl" />
                  </div>
                </div>

                <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                  <FaEnvelope className="text-primary-500 text-xl" />
                </div>

                <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                  <FaShieldHalved className="text-green-500 text-xl" />
                </div>

                <div className="flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse [animation-delay:150ms]" />
                  <div className="w-3 h-3 rounded-full bg-primary-600 animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Reset Your Password
              </h2>
              <p className="text-lg text-gray-600">
                Don&apos;t worry, it happens to the best of us. We&apos;ll help
                you get back into your account in no time.
              </p>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaEnvelope className="text-primary-600 mr-2" />
                  Email Verification
                </div>
                <div className="flex items-center">
                  <FaShieldHalved className="text-primary-600 mr-2" />
                  Secure Reset
                </div>
                <div className="flex items-center">
                  <FaLock className="text-primary-600 mr-2" />
                  Encrypted
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
                {content.title}
              </h1>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      step === s.id
                        ? "bg-primary-600 text-white ring-4 ring-primary-100"
                        : step > s.id
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {s.icon}
                  </div>

                  {i < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        step > s.id ? "bg-primary-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={inputClass}
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Reset Code
                  </label>
                  <div className="relative">
                    <input
                      id="code"
                      type="text"
                      inputMode="numeric"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter the code from your email"
                      className={inputClass}
                    />
                    <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className={inputClass}
                    />
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                {content.button}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  <FaArrowLeft className="text-xs" />
                  Back to Sign In
                </Link>
              </div>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;