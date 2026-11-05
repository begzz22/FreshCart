"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  FaArrowRight,
  FaCartShopping,
  FaCheck,
  FaHeart,
  FaRegHeart,
  FaTrash,
} from "react-icons/fa6";

import { CartProduct } from "@/types/cart.t";
import { useWishlist } from "@/Context/WishlistContext";
import { cartContext } from "@/Context/CartContext";

const fmt = (n: number) => n.toLocaleString("en-US");

export default function WishlistView() {
  const { status } = useSession();
  const { items, isLoading, removeItem } = useWishlist();
  const { addProductCart, products } = useContext(cartContext) as {
    addProductCart: (id: string) => Promise<unknown>;
    products: CartProduct[];
  };
  const [busyId, setBusyId] = useState<string | null>(null);

  const inCart = (id: string) => products.some((c) => c.product.id === id);

  async function handleRemove(id: string) {
    setBusyId(id);
    try {
      await removeItem(id);
    } catch {
      toast.error("Couldn't remove item");
    } finally {
      setBusyId(null);
    }
  }

  async function handleAdd(id: string) {
    setBusyId(id);
    const data = await addProductCart(id);
    if (data) toast.success("Added to cart");
    else toast.error("Couldn't add to cart");
    setBusyId(null);
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  const isGuest = status === "unauthenticated";
  const isEmpty = isGuest || items.length === 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <FaHeart className="text-xl text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 text-sm">
                {isGuest
                  ? "Sign in to save items"
                  : `${items.length} item${items.length === 1 ? "" : "s"} saved`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isEmpty ? (
          <div className="max-w-sm mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <FaRegHeart className="text-3xl text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isGuest
                ? "Sign in to see your wishlist"
                : "Your wishlist is empty"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {isGuest
                ? "Save your favorite products and access them anytime."
                : "Browse products and save your favorites here."}
            </p>
            <Link
              href={isGuest ? "/login" : "/products"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              {isGuest ? "Sign In" : "Browse Products"}
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Table head */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((p) => {
                  const added = inCart(p.id);
                  const busy = busyId === p.id;
                  const hasDiscount =
                    typeof p.priceAfterDiscount === "number" &&
                    p.priceAfterDiscount < p.price;

                  return (
                    <div
                      key={p.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link
                          href={`/productDetails/${p.id}`}
                          className="relative w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                        >
                          <Image
                            src={p.imageCover}
                            alt={p.title}
                            fill
                            sizes="80px"
                            className="object-contain p-2"
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            href={`/productDetails/${p.id}`}
                            className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                          >
                            {p.title}
                          </Link>
                          <p className="text-sm text-gray-400 mt-1">
                            {p.category?.name}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                        <span className="md:hidden text-sm text-gray-500">
                          Price:
                        </span>
                        <div className="text-right md:text-center">
                          {hasDiscount ? (
                            <>
                              <div className="font-semibold text-gray-900">
                                {fmt(p.priceAfterDiscount!)} EGP
                              </div>
                              <div className="text-sm text-gray-400 line-through">
                                {fmt(p.price)} EGP
                              </div>
                            </>
                          ) : (
                            <div className="font-semibold text-gray-900">
                              {fmt(p.price)} EGP
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-2 flex md:justify-center">
                        <span className="md:hidden text-sm text-gray-500 mr-2">
                          Status:
                        </span>
                        {added ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                            <FaCartShopping className="text-[10px]" />
                            In Cart
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            In Stock
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                        {added ? (
                          <Link
                            href="/cart"
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                          >
                            <FaCheck className="text-xs text-green-600" />
                            <span className="md:hidden lg:inline">
                              View Cart
                            </span>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => handleAdd(p.id)}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60"
                          >
                            <FaCartShopping className="text-xs" />
                            <span className="md:hidden lg:inline">
                              Add to Cart
                            </span>
                          </button>
                        )}
                        <button
                          type="button"
                          title="Remove"
                          aria-label="Remove from wishlist"
                          disabled={busy}
                          onClick={() => handleRemove(p.id)}
                          className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Link
                href="/products"
                className="text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
