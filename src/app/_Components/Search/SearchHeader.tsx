"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function SearchHeader({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>

          <span className="text-gray-300">/</span>

          <span className="text-gray-900 font-medium">Search Results</span>
        </nav>

        <form className="max-w-2xl" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
