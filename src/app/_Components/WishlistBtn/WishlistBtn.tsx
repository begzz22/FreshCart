"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "@/Context/WishlistContext";


export default function WishlistBtn({ id }: { id: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { isInWishlist, addItem, removeItem } = useWishlist();
  const [pending, startTransition] = useTransition();
  const added = isInWishlist(id);

  function handleClick() {
    if (!session) {
      toast.error("Please sign in first");
      router.push("/login");
      return;
    }
    startTransition(async () => {
      try {
        if (added) {
          await removeItem(id);
          toast.success("Removed from wishlist");
        } else {
          await addItem(id);
          toast.success("Added to wishlist");
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <button
      type="button"
      title={added ? "Remove from wishlist" : "Add to wishlist"}
      onClick={handleClick}
      disabled={pending}
      className={`bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-colors disabled:opacity-60 ${
        added ? "text-rose-500" : "text-gray-600 hover:text-rose-500"
      }`}
    >
      {added ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
    </button>
  );
}