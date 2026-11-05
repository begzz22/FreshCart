"use server";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/apis/wishlist";

import { Product } from "@/types/product.t";
import { getMyToken } from "@/utilities/token";

export async function getWishlistAction(): Promise<Product[]> {
  const token = await getMyToken();
  if (!token) return [];
  return getWishlist(token);
}

export async function addToWishlistAction(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Unauthorized");
  await addToWishlist(token, productId);
}

export async function removeFromWishlistAction(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Unauthorized");
  await removeFromWishlist(token, productId);
}
