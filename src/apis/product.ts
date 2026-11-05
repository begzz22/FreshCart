import { cacheLife } from "next/cache";


export async function getAllProducts() {
  "use cache";
  cacheLife("hours");
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
  );
  const { data } = await response.json();
  return data;
}

export async function getSingleProduct(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
  );
  const { data } = await response.json();
  return data;
}