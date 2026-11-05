"use client";

import { cartContext } from "@/Context/CartContext";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

const CartBtn = ({ id }: { id: string }) => {
  const { addProductCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);

  async function addProductToCart() {
    setLoading(true);
    try {
      const data = await addProductCart(id);

      if (data.status === "success") {
        toast.success(data.message, { position: "top-center" });
      } else {
        toast.error("Product hasn't been added to cart", {
          position: "top-center",
        });
      }
    } catch {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      title="Add to cart"
      onClick={addProductToCart}
      disabled={loading}
      className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition bg-[#009966] text-white hover:bg-[#007f55] disabled:opacity-70 cursor-pointer"
    >
      {loading ? (
        <AiOutlineLoading3Quarters size={14} className="animate-spin" />
      ) : (
        <FaPlus size={14} />
      )}
    </button>
  );
};

export default CartBtn;
