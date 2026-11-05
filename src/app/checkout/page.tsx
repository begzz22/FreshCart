"use client";

import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cartContext } from "@/Context/CartContext";
import { cashPaymentAction } from "@/PaymentAction/CashPayment";
import { onlinePaymentAction } from "@/PaymentAction/OnlinePayment";

import {
  FaReceipt,
  FaArrowLeft,
  FaHouse,
  FaBookmark,
  FaLocationDot,
  FaPhone,
  FaCity,
  FaPlus,
  FaCircleInfo,
  FaWallet,
  FaMoneyBill,
  FaCreditCard,
  FaCheck,
  FaShieldHalved,
  FaBagShopping,
  FaTruck,
  FaBox,
} from "react-icons/fa6";
import { CartProduct } from "@/types/cart.t";

const Payment = () => {
  const details = useRef<HTMLTextAreaElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  const { cartId, afterPayment, products, totalCartPrice, totalCartItems } =
    useContext(cartContext);

  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subtotal = totalCartPrice || 0;
  const shipping = 0;
  const total = subtotal + shipping;

  async function handlePayment() {
    const shippingDetails = {
      shippingAddress: {
        details: details.current?.value || "",
        phone: phone.current?.value || "",
        city: city.current?.value || "",
      },
    };

    if (
      !shippingDetails.shippingAddress.details ||
      !shippingDetails.shippingAddress.phone ||
      !shippingDetails.shippingAddress.city
    ) {
      setErrorMessage("Please fill in all shipping information.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      if (paymentMethod === "cash") {
        await cashPaymentAction(cartId, shippingDetails);

        afterPayment();
        router.push("/allorders");
      } else {
        const data = await onlinePaymentAction(cartId, shippingDetails);

        if (data.status === "success") {
          window.location.href = data.session.url;
        } else {
          setErrorMessage("Online payment could not be completed.");
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <a href="/" className="hover:text-primary-600 transition">
                Home
              </a>
              <span className="text-gray-300">/</span>
              <a href="/cart" className="hover:text-primary-600 transition">
                Cart
              </a>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                    <FaReceipt />
                  </span>
                  Complete Your Order
                </h1>

                <p className="text-gray-500 mt-2">
                  Review your items and complete your purchase
                </p>
              </div>

              <a
                href="/cart"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
              >
                <FaArrowLeft />
                Back to Cart
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePayment();
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaHouse />
                      Shipping Address
                    </h2>

                    <p className="text-primary-100 text-sm mt-1">
                      Where should we deliver your order?
                    </p>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Saved Addresses */}
                    <div className="pb-5 border-b border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <FaBookmark className="text-primary-500 text-sm" />
                        <span className="font-semibold text-gray-800">
                          Saved Addresses
                        </span>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-600">
                          Enter your shipping address below
                        </p>

                        <div className="w-full p-4 rounded-xl border-2 border-dashed border-primary-500 bg-primary-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-500 text-white">
                              <FaPlus />
                            </div>

                            <div>
                              <p className="font-semibold text-primary-700">
                                New Shipping Address
                              </p>

                              <p className="text-xs text-gray-500 mt-0.5">
                                Enter your shipping information manually
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <FaCircleInfo className="text-blue-600 text-sm" />
                      </div>

                      <div>
                        <p className="text-sm text-blue-800 font-medium">
                          Delivery Information
                        </p>

                        <p className="text-xs text-blue-600 mt-0.5">
                          Please ensure your address is accurate for smooth
                          delivery
                        </p>
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <Label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        City <span className="text-red-500">*</span>
                      </Label>

                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FaCity className="text-gray-500 text-sm" />
                        </div>

                        <Input
                          ref={city}
                          id="city"
                          type="text"
                          required
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 h-auto"
                        />
                      </div>
                    </div>

                    {/* Street Address */}
                    <div>
                      <Label
                        htmlFor="details"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Street Address <span className="text-red-500">*</span>
                      </Label>

                      <div className="relative">
                        <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FaLocationDot className="text-gray-500 text-sm" />
                        </div>

                        <textarea
                          ref={details}
                          id="details"
                          rows={3}
                          required
                          placeholder="Street name, building number, floor, apartment..."
                          className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <Label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </Label>

                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FaPhone className="text-gray-500 text-sm" />
                        </div>

                        <Input
                          ref={phone}
                          id="phone"
                          type="tel"
                          required
                          placeholder="01xxxxxxxxx"
                          className="w-full px-4 py-3.5 pl-14 pr-36 border-2 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 h-auto"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          Egyptian numbers only
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaWallet />
                      Payment Method
                    </h2>

                    <p className="text-primary-100 text-sm mt-1">
                      Choose how you'd like to pay
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Cash Payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                        paymentMethod === "cash"
                          ? "border-primary-500 bg-linear-to-r from-primary-50 to-emerald-50 shadow-sm"
                          : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                          paymentMethod === "cash"
                            ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <FaMoneyBill className="text-xl" />
                      </div>

                      <div className="flex-1 text-left">
                        <h3
                          className={`font-bold ${
                            paymentMethod === "cash"
                              ? "text-primary-700"
                              : "text-gray-900"
                          }`}
                        >
                          Cash on Delivery
                        </h3>

                        <p className="text-sm text-gray-500 mt-0.5">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          paymentMethod === "cash"
                            ? "bg-primary-600 text-white"
                            : "border-2 border-gray-200"
                        }`}
                      >
                        {paymentMethod === "cash" && (
                          <FaCheck className="text-xs" />
                        )}
                      </div>
                    </button>

                    {/* Online Payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("online")}
                      className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                        paymentMethod === "online"
                          ? "border-primary-500 bg-linear-to-r from-primary-50 to-emerald-50 shadow-sm"
                          : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                          paymentMethod === "online"
                            ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <FaCreditCard className="text-xl" />
                      </div>

                      <div className="flex-1 text-left">
                        <h3
                          className={`font-bold ${
                            paymentMethod === "online"
                              ? "text-primary-700"
                              : "text-gray-900"
                          }`}
                        >
                          Pay Online
                        </h3>

                        <p className="text-sm text-gray-500 mt-0.5">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <img
                            alt="Visa"
                            className="h-5"
                            src="https://img.icons8.com/color/48/visa.png"
                          />
                          <img
                            alt="Mastercard"
                            className="h-5"
                            src="https://img.icons8.com/color/48/mastercard.png"
                          />
                          <img
                            alt="Amex"
                            className="h-5"
                            src="https://img.icons8.com/color/48/amex.png"
                          />
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          paymentMethod === "online"
                            ? "bg-primary-600 text-white"
                            : "border-2 border-gray-200"
                        }`}
                      >
                        {paymentMethod === "online" && (
                          <FaCheck className="text-xs" />
                        )}
                      </div>
                    </button>

                    {/* Security */}
                    <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <FaShieldHalved className="text-green-600" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Secure & Encrypted
                        </p>

                        <p className="text-xs text-green-600 mt-0.5">
                          Your payment info is protected with 256-bit SSL
                          encryption
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                  {/* Header */}
                  <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaBagShopping />
                      Order Summary
                    </h2>

                    <p className="text-primary-100 text-sm mt-1">
                      Review your order before checkout
                    </p>
                  </div>

                  <div className="p-5">
                    {/* Products */}
                    <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                      {products?.length > 0 ? (
                        products.map((item:CartProduct) => (
                          <div
                            key={item.product._id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            {/* Product Image */}
                            <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.product.title}
                              </p>

                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.count} × {item.price} EGP
                              </p>
                            </div>

                            {/* Product Total */}
                            <p className="text-sm font-bold text-gray-900 shrink-0">
                              {(item.price * item.count).toLocaleString(
                                "en-EG",
                              )}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          Your cart is empty.
                        </p>
                      )}
                    </div>

                    <hr className="border-gray-100 my-4" />

                    {/* Prices */}
                    <div className="space-y-3">
                      {/* Subtotal */}
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>

                        <span className="font-medium">{subtotal} EGP</span>
                      </div>

                      {/* Shipping */}
                      <div className="flex justify-between text-gray-600">
                        <span className="flex items-center gap-2">
                          <FaTruck className="text-gray-400" />
                          Shipping
                        </span>

                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      </div>

                      <hr className="border-gray-100" />

                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total
                        </span>

                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary-600">
                            {total}
                          </span>

                          <span className="text-sm text-gray-500 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                        {errorMessage}
                      </div>
                    )}

                    {/* Place Order */}
                    <Button
                      type="submit"
                      disabled={loading || products.length === 0}
                      className="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98] h-auto"
                    >
                      {loading ? (
                        "Processing..."
                      ) : (
                        <>
                          <FaBox />
                          Place Order
                        </>
                      )}
                    </Button>

                    {/* Footer Security */}
                    <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaShieldHalved className="text-green-500" />
                        <span>Secure</span>
                      </div>

                      <div className="w-px h-4 bg-gray-200"></div>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaTruck className="text-blue-500" />
                        <span>Fast Delivery</span>
                      </div>

                      <div className="w-px h-4 bg-gray-200"></div>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaBox className="text-orange-500" />
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
