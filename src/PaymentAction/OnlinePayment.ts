"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function onlinePaymentAction(cartId: string, values: object) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login First");
  }

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    values,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
