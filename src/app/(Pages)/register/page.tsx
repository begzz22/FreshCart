"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import imageReview from "../../../../public/images/review-author.png"
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaFacebook,
  FaGoogle,
  FaShieldHalved,
  FaStar,
  FaTruckFast,
  FaUserPlus,
} from "react-icons/fa6";
import { registerSchema, registerSchemaType } from "@/schema/registerSchema";
import Image from "next/image";

const inputBase =
  "w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all";
const inputOk =
  "border-gray-200 focus:border-primary-500 focus:ring-primary-100";
const inputError = "border-red-400 focus:border-red-500 focus:ring-red-100";

type FieldProps = {
  name: keyof registerSchemaType;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  control: Control<registerSchemaType>;
  children?: React.ReactNode;
};

function TextField({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  control,
  children,
}: FieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}*
          </label>

          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            className={`${inputBase} ${fieldState.invalid ? inputError : inputOk}`}
          />

          {fieldState.invalid && (
            <p className="text-red-500 text-sm">{fieldState.error?.message}</p>
          )}

          {children}
        </div>
      )}
    />
  );
}

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Za-z]/.test(password) && /\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) return { percent: 0, label: "Weak", color: "bg-red-500" };
  if (score <= 1) return { percent: 33, label: "Weak", color: "bg-red-500" };
  if (score === 2)
    return { percent: 66, label: "Medium", color: "bg-yellow-500" };
  return { percent: 100, label: "Strong", color: "bg-green-500" };
}

const features = [
  {
    icon: <FaStar />,
    title: "Premium Quality",
    text: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: <FaTruckFast />,
    title: "Fast Delivery",
    text: "Same-day delivery available in most areas",
  },
  {
    icon: <FaShieldHalved />,
    title: "Secure Shopping",
    text: "Your data and payments are completely secure",
  },
];

const Register = () => {
  const router = useRouter();
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const isSubmitting = form.formState.isSubmitting;
  const strength = getStrength(form.watch("password") ?? "");

  async function signUp(values: registerSchemaType) {
    if (!terms) {
      setTermsError(true);
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );
      toast.success(data.message, { position: "top-center" });
      router.push("/login");
    } catch (e) {
      const message = axios.isAxiosError(e)
        ? e.response?.data?.message
        : undefined;
      toast.error(message || "Something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <main className="py-10">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        {/* Left side */}
        <div>
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-primary-600">FreshCart</span>
          </h1>
          <p className="text-xl mt-2 mb-4">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <ul className="space-y-6 my-8">
            {features.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <div className="size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-white shadow-sm p-4 rounded-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-full bg-primary-100 text-primary-700 font-bold text-lg flex items-center justify-center">
                <Image src={imageReview} alt="profile picture" />
              </div>
              <div>
                <h3>Sarah Johnson</h3>
                <div className="flex text-yellow-300">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <blockquote>
              <p className="italic text-gray-600">
                &quot;FreshCart has transformed my shopping experience. The
                quality of the products is outstanding, and the delivery is
                always on time. Highly recommend!&quot;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>

          {/* Social (شكل بس) */}
          <div className="flex gap-2 my-10">
            <button
              type="button"
              aria-label="Sign up with Google"
              className="grow py-3 px-4 rounded-lg border border-gray-300 hover:cursor-pointer hover:bg-gray-100 transition flex justify-center items-center gap-2"
            >
              <FaGoogle className="text-red-600" />
              <span>Google</span>
            </button>
            <button
              type="button"
              aria-label="Sign up with Facebook"
              className="grow py-3 px-4 rounded-lg border border-gray-300 hover:cursor-pointer hover:bg-gray-100 transition flex justify-center items-center gap-2"
            >
              <FaFacebook className="text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4 flex items-center" aria-hidden="true">
            <div className="w-full h-px bg-gray-200" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-gray-500">
              or
            </span>
          </div>

          <form
            onSubmit={form.handleSubmit(signUp)}
            className="space-y-7 mt-8"
            noValidate
          >
            <TextField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Ali"
            />

            <TextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="ali@example.com"
              autoComplete="email"
            />

            <TextField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="create a strong password"
              autoComplete="new-password"
            >
              <div className="flex items-center gap-2">
                <div
                  className="grow h-1 bg-gray-200 rounded-md overflow-hidden"
                  role="progressbar"
                  aria-valuenow={strength.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Password strength: ${strength.label}`}
                >
                  <div
                    className={`h-full transition-all duration-300 ease-out ${strength.color}`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
                <span className="text-sm font-medium min-w-12.5">
                  {strength.label}
                </span>
              </div>
              <p className="text-gray-500 text-xs">
                Must be at least 8 characters with numbers and symbols
              </p>
            </TextField>

            <TextField
              control={form.control}
              name="rePassword"
              label="Confirm Password"
              type="password"
              placeholder="confirm your password"
              autoComplete="new-password"
            />

            <TextField
              control={form.control}
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="+20 100 000 0000"
              autoComplete="tel"
            />

            {/* Terms */}
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={terms}
                  onChange={(e) => {
                    setTerms(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  className="size-4 accent-primary-600"
                />
                <label htmlFor="terms" className="ms-2">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  *
                </label>
              </div>
              {termsError && (
                <p className="text-red-500 text-sm mt-1">
                  You must agree to the terms to continue
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-primary-600 text-white hover:cursor-pointer hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaUserPlus />
              )}
              <span>Create My Account</span>
            </button>
          </form>

          <p className="border-t pt-10 border-gray-200 my-4 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-600 hover:underline  font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
