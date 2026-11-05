"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfinitySpin } from "react-loader-spinner";
import {
  FaArrowRight,
  FaBagShopping,
  FaBoxOpen,
  FaCartShopping,
  FaCheck,
  FaLock,
  FaMinus,
  FaPlus,
  FaShieldHalved,
  FaTag,
  FaTrash,
  FaTruck,
} from "react-icons/fa6";
import { cartContext } from "@/Context/CartContext";
import { CartProduct } from "@/types/cart.t";

const FREE_SHIPPING_FROM = 500;
const SHIPPING_FEE = 50;

const Cart = () => {
  const {
    totalCartPrice,
    products,
    isLoading,
    deleteCartItem,
    updateCartCount,
    clearUserCart,
  } = useContext(cartContext);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center">
        <InfinitySpin
          visible={true}
          height="200"
          width="200"
          color="green"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
              <FaBoxOpen className="text-5xl text-gray-300" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet.
            <br />
            Start exploring our products!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          >
            Start Shopping <FaArrowRight className="text-sm" />
          </Link>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Electronics", "Fashion", "Home", "Beauty"].map((c) => (
                <Link
                  key={c}
                  href="/categories"
                  className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Filled ---------- */
  const itemsCount = products.length;
  const subtotal = totalCartPrice;
  const freeShipping = subtotal >= FREE_SHIPPING_FROM;
  const shipping = freeShipping ? 0 : SHIPPING_FEE;
  const remaining = Math.max(FREE_SHIPPING_FROM - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_FROM) * 100, 100);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
              <FaCartShopping />
            </span>
            Shopping Cart
          </h1>
          <p className="text-gray-500 mt-2">
            You have{" "}
            <span className="font-semibold text-primary-600">
              {itemsCount} item{itemsCount > 1 ? "s" : ""}
            </span>{" "}
            in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {products.map((item: CartProduct) => {
                const p = item.product;
                return (
                  <div
                    key={p.id}
                    className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex gap-4 sm:gap-6">
                        <Link
                          href={`/productDetails/${p.id}`}
                          className="relative shrink-0 group"
                        >
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                            <Image
                              src={p.imageCover}
                              alt={p.title}
                              fill
                              sizes="128px"
                              className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <FaCheck className="text-[8px]" />
                            In Stock
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="mb-3">
                            <Link
                              href={`/productDetails/${p.id}`}
                              className="group/title"
                            >
                              <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg line-clamp-2">
                                {p.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-2">
                              {p.category?.name && (
                                <>
                                  <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                                    {p.category.name}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    •
                                  </span>
                                </>
                              )}
                              <span className="text-xs text-gray-500">
                                SKU: {p.id.slice(-6).toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <div className="mb-4 flex items-baseline gap-2">
                            <span className="text-primary-600 font-bold text-lg">
                              {item.price} EGP
                            </span>
                            <span className="text-xs text-gray-400">
                              per unit
                            </span>
                          </div>

                          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                              <button
                                type="button"
                                disabled={item.count <= 1}
                                onClick={() =>
                                  updateCartCount(p.id, item.count - 1)
                                }
                                aria-label="Decrease quantity"
                                className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:cursor-pointer hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="w-12 text-center font-bold text-gray-900">
                                {item.count}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartCount(p.id, item.count + 1)
                                }
                                aria-label="Increase quantity"
                                className="h-8 w-8 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center hover:cursor-pointer text-white hover:bg-primary-700 transition-all"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xs text-gray-400 mb-0.5">
                                  Total
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  {item.price * item.count}{" "}
                                  <span className="text-sm font-medium text-gray-400">
                                    EGP
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => deleteCartItem(p.id)}
                                title="Remove item"
                                aria-label="Remove from cart"
                                className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:cursor-pointer hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                href="/"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
              >
                <span>←</span> Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearUserCart}
                className="group flex items-center gap-2 text-sm text-gray-400 hover:cursor-pointer hover:text-red-500 transition-colors"
              >
                <FaTrash className="text-xs  group-hover:scale-110 transition-transform" />
                <span>Clear all items</span>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
              <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaBagShopping />
                  Order Summary
                </h2>
                <p className="text-primary-100 text-sm mt-1">
                  {itemsCount} item{itemsCount > 1 ? "s" : ""} in your cart
                </p>
              </div>

              <div className="p-6 space-y-5">
                <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTruck className="text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {freeShipping
                        ? "You got free shipping!"
                        : `Add ${remaining} EGP for free shipping`}
                    </span>
                  </div>
                  <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {subtotal} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                      {freeShipping ? "Free" : `${shipping} EGP`}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {subtotal + shipping}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
                >
                  <FaTag />
                  <span className="text-sm font-medium">Apply Promo Code</span>
                </button>

                <Link
                  href="/checkout"
                  className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                >
                  <FaLock />
                  <span>Secure Checkout</span>
                </Link>

                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaShieldHalved className="text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaTruck className="text-blue-500" />
                    <span>Fast Delivery</span>
                  </div>
                </div>

                <Link
                  href="/"
                  className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium py-2"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
