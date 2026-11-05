"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types/product.t";
import HomeCard from "../HomeCard/HomeCard";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaGripVertical,
  FaList,
  FaSliders,
  FaXmark,
} from "react-icons/fa6";

type Props = {
  products: Product[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const PRODUCTS_PER_PAGE = 12;

type SortOption =
  | ""
  | "price"
  | "-price"
  | "-ratingsAverage"
  | "title"
  | "-title";

export default function SearchResults({
  products = [],
  searchTerm,
  setSearchTerm,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [showFilters, setShowFilters] = useState(false);

  // Sorting
  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sortBy) {
      case "price":
        result.sort((a, b) => a.price - b.price);
        break;

      case "-price":
        result.sort((a, b) => b.price - a.price);
        break;

      case "-ratingsAverage":
        result.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
        break;

      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "-title":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [products, sortBy]);

  // Reset page when sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, products]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <div className="flex-1 min-w-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          {/* Mobile Filters */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <FaSliders />
            Filters
          </button>

          {/* View Mode */}
          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-primary-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaGripVertical />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-primary-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none bg-white"
          >
            <option value="">Relevance</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-ratingsAverage">Rating: High to Low</option>
            <option value="title">Name: A to Z</option>
            <option value="-title">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Active Search */}
      {searchTerm.trim() && (
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <FaFilter className="text-xs" />
            Active:
          </span>

          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs">
            {searchTerm}

            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="hover:text-red-500"
            >
              <FaXmark />
            </button>
          </span>

          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Mobile Filters Placeholder */}
      {showFilters && (
        <div className="lg:hidden bg-white border border-gray-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">
            Use the filters in the sidebar to narrow down products.
          </p>
        </div>
      )}

      {/* Products */}
      {currentProducts.length > 0 ? (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                : "flex flex-col gap-4"
            }
          >
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className={viewMode === "list" ? "w-full" : ""}
              >
                <HomeCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                      currentPage === page
                        ? "bg-primary-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <h3 className="text-lg font-bold text-gray-800">No Products Found</h3>
          <p className="text-gray-500 text-sm mt-2">
            Try searching with another product name.
          </p>
        </div>
      )}
    </div>
  );
}
