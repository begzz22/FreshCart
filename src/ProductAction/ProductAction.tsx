"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cartContext } from "@/Context/CartContext";
import { useWishlist } from "@/Context/WishlistContext"; // عدّل المسار حسب مكان الملف عندك
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaBolt,
  FaCartShopping,
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaShareNodes,
} from "react-icons/fa6";

type Props = {
  id: string;
  max: number;
  price: number;
};

export default function ProductActions({ id, max, price }: Props) {
  const router = useRouter();
  const { addProductCart } = useContext(cartContext);
  const { isInWishlist, addItem, removeItem } = useWishlist();

  const [count, setCount] = useState(1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const isLoading = loadingAdd || loadingBuy;
  const wishlisted = isInWishlist(id);

  const update = (value: number) => {
    setCount(Math.min(Math.max(value || 1, 1), max));
  };

  async function addToCart(): Promise<boolean> {
    try {
      let lastResponse;

      for (let i = 0; i < count; i++) {
        lastResponse = await addProductCart(id);

        if (lastResponse?.status !== "success") {
          toast.error("Product hasn't been added to cart", {
            position: "top-center",
          });
          return false;
        }
      }

      toast.success(lastResponse?.message ?? "Added to cart", {
        position: "top-center",
      });
      return true;
    } catch {
      toast.error("Something went wrong", { position: "top-center" });
      return false;
    }
  }

  async function handleAddToCart() {
    setLoadingAdd(true);
    await addToCart();
    setLoadingAdd(false);
  }

  async function handleBuyNow() {
    setLoadingBuy(true);
    const ok = await addToCart();
    setLoadingBuy(false);

    if (ok) router.push("/cart"); // غيّر المسار لو الـ checkout عندك مختلف
  }

  async function handleWishlist() {
    setLoadingWishlist(true);
    try {
      if (wishlisted) {
        await removeItem(id);
        toast.success("Removed from wishlist", { position: "top-center" });
      } else {
        await addItem(id);
        toast.success("Added to wishlist", { position: "top-center" });
      }
    } catch {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setLoadingWishlist(false);
    }
  }

  return (
    <>
      {/* Quantity */}
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Quantity
        </label>

        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => update(count - 1)}
              disabled={count <= 1}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:cursor-pointer hover:text-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaMinus />
            </button>

            <input
              id="quantity"
              type="number"
              min={1}
              max={max}
              value={count}
              onChange={(e) => update(Number(e.target.value))}
              className="w-16 text-center border-0 focus:ring-0  focus:outline-none text-lg font-medium"
            />

            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => update(count + 1)}
              disabled={count >= max}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:cursor-pointer hover:text-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus />
            </button>
          </div>

          <span className="text-sm text-gray-500">{max} available</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-2xl font-bold text-primary-600">
            {(price * count).toFixed(2)} EGP
          </span>
        </div>
      </div>

      {/* Add to Cart + Buy Now */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isLoading}
          className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:cursor-pointer hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingAdd ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <FaCartShopping />
          )}
          Add to Cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isLoading}
          className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:cursor-pointer hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingBuy ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <FaBolt />
          )}
          Buy Now
        </button>
      </div>

      {/* Wishlist + Share */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={handleWishlist}
          disabled={loadingWishlist}
          className={`flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            wishlisted
              ? "border-red-300 text-red-500 bg-red-50"
              : "border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600"
          }`}
        >
          {loadingWishlist ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : wishlisted ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
          {wishlisted ? "In Wishlist" : "Add to Wishlist"}
        </button>

        <button
          type="button"
          aria-label="Share product"
          className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:cursor-pointer hover:text-primary-600 transition"
        >
          <FaShareNodes />
        </button>
      </div>
    </>
  );
}
