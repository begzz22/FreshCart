"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  FaTruck,
  FaGift,
  FaPhone,
  FaUserPlus,
  FaRegEnvelope,
  FaRegUser,
  FaRightFromBracket,
} from "react-icons/fa6";

const linkCls =
  "flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors";

export default function TopBar() {
  const { data: session, status } = useSession();

  return (
    <div className="hidden lg:block text-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <FaTruck className="text-primary-600 text-xs" />
              Free Shipping on Orders over 500 EGP
            </span>
            <span className="flex items-center gap-2">
              <FaGift className="text-primary-600 text-xs" />
              New Arrivals Daily
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-500">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
              >
                <FaPhone className="text-xs" /> +1 (800) 123-4567
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
              >
                <FaRegEnvelope className="text-xs" /> support@freshcart.com
              </a>
            </div>

            <span className="w-px h-4 bg-gray-200" />

            <div className="flex items-center gap-4 min-w-30 justify-end">
              {status === "loading" ? null : session ? (
                <>
                  <Link href="/profile" className={linkCls}>
                    <FaRegUser className="text-xs" />
                    {session.user?.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-1.5 text-gray-600 hover:cursor-pointer hover:text-red-500 transition-colors"
                  >
                    <FaRightFromBracket className="text-xs" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={linkCls}>
                    <FaRegUser className="text-xs" /> Sign In
                  </Link>
                  <Link href="/register" className={linkCls}>
                    <FaUserPlus className="text-xs" /> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
