"use client";

import { useState } from "react";
import Image from "next/image";
import { Order } from "@/types/orders.t";
import {
  FaClock,
  FaHashtag,
  FaMoneyBill,
  FaCalendarDays,
  FaBox,
  FaLocationDot,
  FaChevronDown,
  FaReceipt,
  FaPhone,
} from "react-icons/fa6";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  const totalItems = order.cartItems.reduce(
    (total, item) => total + item.count,
    0,
  );

  const firstItem = order.cartItems[0];

  const shortTitle = (title: string) => title.split(" ").slice(0, 3).join(" ");

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-primary-200 shadow-lg shadow-primary-100/50">
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          {/* Product Image */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              {firstItem && (
                <Image
                  src={firstItem.product.imageCover}
                  alt={shortTitle(firstItem.product.title)}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {totalItems > 1 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                +{totalItems - 1}
              </div>
            )}
          </div>

          {/* Order Information */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2 ${
                    order.isDelivered
                      ? "bg-green-100 text-green-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  <FaClock className="text-xs" />

                  <span className="text-xs font-semibold">
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FaHashtag className="text-xs text-gray-400" />
                  {order._id.slice(-4)}
                </h3>
              </div>

              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                <FaMoneyBill className="text-gray-600" />
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FaCalendarDays className="text-xs text-gray-400" />
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5">
                <FaBox className="text-xs text-gray-400" />
                {totalItems} items
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5">
                <FaLocationDot className="text-xs text-gray-400" />
                {order.shippingAddress.city}
              </span>
            </div>

            {/* Price + Button */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice}
                </span>

                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-primary-600 text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700"
              >
                {showDetails ? "Hide" : "Details"}

                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    showDetails ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center">
                <FaReceipt className="text-xs text-primary-600" />
              </div>
              Order Items
            </h4>

            {/* Items */}
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={shortTitle(item.product.title)}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {shortTitle(item.product.title)}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>{" "}
                      × {item.price} EGP
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {item.count * item.price}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address + Summary */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
            {/* Delivery Address */}
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaLocationDot className="text-xs text-blue-600" />
                </div>
                Delivery Address
              </h4>

              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress.city}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {order.shippingAddress.details}
                </p>

                <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                  <FaPhone className="text-xs text-gray-400" />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                  <FaClock className="text-xs text-white" />
                </div>
                Order Summary
              </h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {order.totalOrderPrice -
                      order.shippingPrice -
                      order.taxPrice}{" "}
                    EGP
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {order.shippingPrice === 0
                      ? "Free"
                      : `${order.shippingPrice} EGP`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">{order.taxPrice} EGP</span>
                </div>

                <hr className="border-gray-200/50 my-2" />

                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>

                  <span className="font-bold text-lg text-gray-900">
                    {order.totalOrderPrice} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
