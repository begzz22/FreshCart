import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/app/_Components/PageHeader/PageHeader";
import {
  getAllCategories,
  getCategory,
  getSubCategories,
} from "@/apis/category";
import { FaLayerGroup } from "react-icons/fa6";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ id: c._id }));
}

async function CategoryContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [category, subs] = await Promise.all([
    getCategory(id),
    getSubCategories(id),
  ]);

  return (
    <>
      <PageHeader
        title={category.name}
        subtitle="Choose a subcategory to browse products"
        image={category.image}
        crumbs={[{ label: "Categories", href: "/categories" }]}
      />

      <div className="container mx-auto px-4 py-10">
        {subs.length === 0 ? (
          <p className="text-center text-gray-500">No subcategories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {subs.map((sub) => (
              <Link
                key={sub._id}
                href={`/products?category=${id}&subcategory=${sub._id}`}
                className="bg-white rounded-xl border border-gray-100 p-6 text-center font-medium shadow-sm hover:shadow-lg hover:border-primary-200 hover:text-primary-600 transition"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={<div className="container mx-auto px-4 py-10 text-gray-500">Loading...</div>}
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}