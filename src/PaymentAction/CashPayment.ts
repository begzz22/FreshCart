"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function cashPaymentAction(cartId: string, values: object) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login First");
  }

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    values,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
