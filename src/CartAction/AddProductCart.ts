"use server";
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addProductToCartAction(id: string) {
  const token = await getMyToken();

  const values = {
    productId: id,
  };

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v2/cart`,
    values,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        token: token as string,
      },
    },
  );

  return data;
}
