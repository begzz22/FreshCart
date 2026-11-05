// app/(Pages)/brands/page.tsx
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaTags } from "react-icons/fa6";
import { getAllBrands } from "@/apis/brand";
import PageHeader from "@/app/_Components/PageHeader/PageHeader";

export default async function Brands() {
  const brands = await getAllBrands();

  return (
    <>
      <PageHeader
        title="Top Brands"
        crumbLabel="Brands"
        subtitle="Shop from your favorite brands"
        icon={FaTags}
        gradient="from-violet-600 via-violet-500 to-purple-400"
      />

      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/products?brand=${brand._id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
                  {brand.name}
                </h3>
                <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-violet-600 flex items-center gap-1">
                    View Products
                    <FaArrowRight className="text-[10px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}