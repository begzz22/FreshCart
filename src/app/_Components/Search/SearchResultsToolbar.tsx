"use client";

import { useState } from "react";
import { FaSliders, FaGripVertical, FaList } from "react-icons/fa6";

type Props = {
  onFilterClick?: () => void;
  onSortChange?: (value: string) => void;
  onViewChange?: (view: "grid" | "list") => void;
};

export default function SearchResultsToolbar({
  onFilterClick,
  onSortChange,
  onViewChange,
}: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");

  function changeView(value: "grid" | "list") {
    setView(value);
    onViewChange?.(value);
  }

  return (
    <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onFilterClick}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <FaSliders />
          Filters
        </button>

        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
          <button
            type="button"
            onClick={() => changeView("grid")}
            className={`p-2 rounded-md transition-colors ${
              view === "grid"
                ? "bg-primary-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Grid view"
          >
            <FaGripVertical />
          </button>

          <button
            type="button"
            onClick={() => changeView("list")}
            className={`p-2 rounded-md transition-colors ${
              view === "list"
                ? "bg-primary-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="List view"
          >
            <FaList />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>

        <select
          defaultValue=""
          onChange={(e) => onSortChange?.(e.target.value)}
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
  );
}
