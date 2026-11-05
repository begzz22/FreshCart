import { getAllProducts } from "@/apis/product";
import SearchPageContent from "./SearchPageContent";

export default async function SearchPage() {
  const products = await getAllProducts();

  return (
    <SearchPageContent
      initialProducts={Array.isArray(products) ? products : []}
    />
  );
}
