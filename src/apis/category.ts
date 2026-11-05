import { cacheLife } from "next/cache";
import { Category, SubCategory } from "@/types/category.t";

const BASE = "https://ecommerce.routemisr.com/api/v1/categories";

export async function getAllCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(BASE);
  const { data } = await response.json();
  return data;
}

export async function getCategory(id: string): Promise<Category> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${BASE}/${id}`);
  const { data } = await response.json();
  return data;
}

export async function getSubCategories(id: string): Promise<SubCategory[]> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${BASE}/${id}/subcategories`);
  const { data } = await response.json();
  return data;
}