import { Product } from "@/types/product.t";
import { WishlistMutationResponse, WishlistResponse } from "@/types/wishlist.t";

const BASE = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function getWishlist(token: string): Promise<Product[]> {
  const res = await fetch(BASE, { headers: { token }, cache: "no-store" });
  if (!res.ok) return [];
  const json: WishlistResponse = await res.json();
  return json.data ?? [];
}

export async function addToWishlist(token: string, productId: string) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to add");
  return (await res.json()) as WishlistMutationResponse;
}

export async function removeFromWishlist(token: string, productId: string) {
  const res = await fetch(`${BASE}/${productId}`, {
    method: "DELETE",
    headers: { token },
  });
  if (!res.ok) throw new Error("Failed to remove");
  return (await res.json()) as WishlistMutationResponse;
}