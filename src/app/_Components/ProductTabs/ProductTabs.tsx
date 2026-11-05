"use client";

import { useState } from "react";
import { FaBox, FaCheck, FaRegStar, FaStar, FaTruck } from "react-icons/fa6";
import { Product } from "@/types/product.t";

type TabKey = "details" | "reviews" | "shipping";

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<TabKey>("details");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: "details",
      label: "Product Details",
      icon: <FaBox className="text-sm" />,
    },
    {
      key: "reviews",
      label: `Reviews (${product.ratingsQuantity})`,
      icon: <FaStar className="text-sm" />,
    },
    {
      key: "shipping",
      label: "Shipping & Returns",
      icon: <FaTruck className="text-sm" />,
    },
  ];

  const features = [
    "Premium Quality Product",
    "100% Authentic Guarantee",
    "Fast & Secure Packaging",
    "Quality Tested",
  ];

  const ratingBars = [
    { stars: 5, percent: 25 },
    { stars: 4, percent: 60 },
    { stars: 3, percent: 25 },
    { stars: 2, percent: 5 },
    { stars: 1, percent: 5 },
  ];

  return (
    <section id="product-details-tabs" className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tab buttons */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.key
                      ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Details */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About this Product
                  </h3>
                  <p className="text-gray-600 leading-relaxed ">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Product Information
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Category</span>
                        <span className="text-gray-900 font-medium">
                          {product.category?.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Subcategory</span>
                        <span className="text-gray-900 font-medium">
                          {product.subcategory?.[0]?.name ?? "-"}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Brand</span>
                        <span className="text-gray-900 font-medium">
                          {product.brand?.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Items Sold</span>
                        <span className="text-gray-900 font-medium">
                          {product.sold}+ sold
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <FaCheck className="text-primary-600 mr-2 w-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-10 py-4">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  {/* Average */}
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gray-900 mb-2">
                      {product.ratingsAverage}
                    </div>

                    <div className="flex justify-center text-yellow-400">
                      {Array.from({ length: 5 }, (_, i) =>
                        i < Math.round(product.ratingsAverage) ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        ),
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Based on {product.ratingsQuantity} reviews
                    </p>
                  </div>

                  {/* Distribution */}
                  <div className="flex-1 w-full">
                    {ratingBars.map((bar) => (
                      <div
                        key={bar.stars}
                        className="flex items-center gap-3 mb-4"
                      >
                        <span className="text-base text-gray-600 w-12">
                          {bar.stars} star
                        </span>

                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                            style={{ width: `${bar.percent}%` }}
                          />
                        </div>

                        <span className="text-sm text-gray-500 w-10">
                          {bar.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Empty state */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="text-center py-8">
                    <FaStar className="text-4xl text-gray-300 mb-3 mx-auto" />
                    <p className="text-gray-500">
                      Customer reviews will be displayed here.
                    </p>
                    <button
                      type="button"
                      className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Shipping Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <FaCheck className="text-primary-600 mr-2 w-4" />
                      Free delivery on orders over $50
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-primary-600 mr-2 w-4" />
                      Delivery within 3-5 business days
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Returns Policy
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <FaCheck className="text-primary-600 mr-2 w-4" />
                      30 days money-back guarantee
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-primary-600 mr-2 w-4" />
                      Items must be unused and in original packaging
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
