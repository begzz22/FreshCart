"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product.t";

import SearchHeader from "@/app/_Components/Search/SearchHeader";
import SearchResults from "@/app/_Components/Search/SearchResults";
import SearchSidebar from "@/app/_Components/Search/SearchSidebar";
import { useSearchParams } from "next/navigation";
import { FaFilter, FaXmark } from "react-icons/fa6";

type Props = {
  initialProducts: Product[];
};

export default function SearchPageContent({ initialProducts = [] }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.title
      ?.toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (category) =>
          category.trim().toLowerCase() ===
          product.category?.name?.trim().toLowerCase(),
      );

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.some(
        (brand) =>
          brand.trim().toLowerCase() ===
          product.brand?.name?.trim().toLowerCase(),
      );

    const price = product.priceAfterDiscount || product.price;

    const matchesMin = minPrice === "" || price >= Number(minPrice);

    const matchesMax = maxPrice === "" || price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesMin &&
      matchesMax
    );
  });

  return (
    <>
      <SearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SearchSidebar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />


          <SearchResults
            products={filteredProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
    </>
  );
}
