"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  const x =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!x) return undefined;

  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is missing");

  const decoded = await decode({ token: x, secret });

  return decoded?.token as string | undefined;
}
