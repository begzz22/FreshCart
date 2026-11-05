import { cacheLife } from "next/cache";
import { Brand } from "@/types/brand.t";

const BASE = "https://ecommerce.routemisr.com/api/v1/brands";

export async function getAllBrands(): Promise<Brand[]> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(BASE);
  const { data } = await response.json();
  return data;
}

export async function getBrand(id: string): Promise<Brand> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${BASE}/${id}`);
  const { data } = await response.json();
  return data;
}
