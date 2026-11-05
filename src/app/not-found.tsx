"use client";

import Link from "next/link";
import {
  Apple,
  Carrot,
  Cherry,
  Sprout,
  ShoppingCart,
  House,
  ArrowLeft,
} from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-[#fafbfc] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Apple className="absolute top-[10%] left-[5%] text-primary-200 size-10 animate-pulse" />
        <Carrot className="absolute top-[20%] right-[10%] text-primary-200 size-9 animate-pulse" />
        <Cherry className="absolute bottom-[25%] left-[8%] text-primary-200 size-8 animate-pulse" />
        <Sprout className="absolute bottom-[15%] right-[15%] text-primary-200 size-10 animate-pulse" />
        <Apple className="absolute top-[50%] left-[15%] text-primary-100 size-7" />
        <Carrot className="absolute top-[40%] right-[5%] text-primary-100 size-7" />

        <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-primary-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-primary-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl w-full">
        <div className="flex justify-center mb-10">
          <div className="relative w-64 h-52 sm:w-72 sm:h-60">
            <div className="absolute inset-0 bg-primary-100/50 rounded-4xl blur-2xl" />

            <div className="absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-primary-50/80 via-transparent to-primary-100/40" />

              <ShoppingCart className="relative size-16 sm:size-20 text-primary-400/80" />
            </div>

            <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/40">
                <span className="text-xl sm:text-2xl font-black text-white">
                  404
                </span>
              </div>
            </div>

            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <div className="size-2.5 rounded-full bg-primary-400" />
              <div className="w-8 h-4 border-b-[3px] border-primary-400 rounded-b-full" />
              <div className="size-2.5 rounded-full bg-primary-400" />
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Oops! Nothing Here
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
            Looks like this page went out of stock! Don't worry, there's plenty
            more fresh content to explore.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-600/25 hover:-translate-y-1"
          >
            <House className="group-hover:scale-110 transition-transform" />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md border border-gray-200 hover:-translate-y-1"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Popular Destinations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-xl bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition-colors"
            >
              All Products
            </Link>

            <Link
              href="/categories"
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Categories
            </Link>

            <Link
              href="/deals"
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Today's Deals
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
