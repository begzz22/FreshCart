import { getAllCategories } from "@/apis/category";
import { Category } from "@/types/category.t";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const Categories = async () => {
  const categories: Category[] = await getAllCategories();

  return (
    <section id="categories">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-primary-600 self-end sm:self-auto hover:text-primary-700 font-medium flex items-center"
          >
            View All Categories
            <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group"
            >
              <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
                <Image
                  width={300}
                  height={300}
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
