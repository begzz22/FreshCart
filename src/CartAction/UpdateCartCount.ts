"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function updateCartCountAction(id: string, count: number) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login First!");
  }

  const values = {
    count: count,
  };

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
    values,
    {
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    },
  );

  return data;
}
