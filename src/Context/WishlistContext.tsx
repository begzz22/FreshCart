"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import {
  addToWishlistAction,
  getWishlistAction,
  removeFromWishlistAction,
} from "@/wishlistAction/wishlist";
import { Product } from "@/types/product.t";

type WishlistCtx = {
  items: Product[];
  isLoading: boolean;
  isInWishlist: (id: string) => boolean;
  addItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
};

const WishlistContext = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setItems(await getWishlistAction());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setItems([]);
      setIsLoading(false);
      return;
    }
    refresh();
  }, [status, refresh]);

  async function addItem(id: string) {
    await addToWishlistAction(id);
    await refresh();
  }

  async function removeItem(id: string) {
    const prev = items;
    setItems((cur) => cur.filter((p) => p.id !== id));
    try {
      await removeFromWishlistAction(id);
    } catch (e) {
      setItems(prev);
      throw e;
    }
  }

  const isInWishlist = (id: string) => items.some((p) => p.id === id);

  return (
    <WishlistContext.Provider
      value={{ items, isLoading, isInWishlist, addItem, removeItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
