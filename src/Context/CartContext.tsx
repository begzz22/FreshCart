import { addProductToCartAction } from "@/CartAction/AddProductCart";
import { clearCartAction } from "@/CartAction/ClearUserCart";
import { getUserCartAction } from "@/CartAction/GetUserCart";
import { deleteCartItemAction } from "@/CartAction/RemoveCartItem";
import { updateCartCountAction } from "@/CartAction/UpdateCartCount";
import { Cart, CartProduct } from "@/types/cart.t";
import { createContext, useEffect, useState } from "react";

type ApiResponse = {
  status?: string;
  message?: string;
  [key: string]: unknown;
};

type CartContextType = {
  products: CartProduct[];
  totalCartPrice: number;
  totalCartItems: number;
  isLoading: boolean;
  cartId: string;
  afterPayment: () => void;
  addProductCart: (id: string) => Promise<ApiResponse>;
  deleteCartItem: (id: string) => Promise<ApiResponse>;
  updateCartCount: (id: string, count: number) => Promise<ApiResponse>;
  clearUserCart: () => Promise<ApiResponse>;
};

export const cartContext = createContext<CartContextType>(
  {} as CartContextType,
);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setcartId] = useState("");

  async function getUserCart() {
    setIsLoading(true);
    try {
      const data: Cart = await getUserCartAction();
      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);

      setIsLoading(false);
      setcartId(data.cartId);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function addProductCart(id: string) {
    try {
      const data = await addProductToCartAction(id);

      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      setcartId(data.cartId);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCartItem(id: string) {
    try {
      const data = await deleteCartItemAction(id);

      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      setcartId(data.cartId);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartCount(id: string, count: number) {
    try {
      const data = await updateCartCountAction(id, count);

      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      setcartId(data.cartId);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function clearUserCart() {
    try {
      const data = await clearCartAction();

      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      setcartId("");

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function afterPayment() {
    setProducts([]);
    setTotalCartPrice(0);
    setTotalCartItems(0);
    setcartId("");
  }

  useEffect(function () {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        totalCartItems,
        totalCartPrice,
        products,
        cartId,
        addProductCart,
        isLoading,
        deleteCartItem,
        updateCartCount,
        clearUserCart,
        afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
