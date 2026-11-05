import { Suspense } from "react";
import Link from "next/link";
import { getAllProducts, getSingleProduct } from "@/apis/product";
import { Product } from "@/types/product.t";
import {
  FaStar,
  FaRegStar,
  FaTruckFast,
  FaShieldHalved,
} from "react-icons/fa6";
import { FaUndo } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";
import ProductActions from "@/ProductAction/ProductAction";
import ProductGallery from "@/ProductAction/ProductGallery";
import ProductTabs from "@/app/_Components/ProductTabs/ProductTabs";
import SimilarProducts from "@/app/_Components/ProductTabs/SimilarProducts";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }, (_, i) =>
        i < Math.round(rating) ? <FaStar key={i} /> : <FaRegStar key={i} />,
      )}
    </div>
  );
}

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data: Product = await getSingleProduct(id);

  const allProducts: Product[] = await getAllProducts();

  const related = allProducts
    .filter((p) => p.category?._id === data.category?._id && p.id !== data.id)
    .slice(0, 10);

  const inStock = data.quantity > 0;
  const images = [
    data.imageCover,
    ...(data.images ?? []).filter((img) => img !== data.imageCover),
  ];

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Images */}
            <div id="product-images" className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-4">
                <ProductGallery images={images} title={data.title} />
              </div>
            </div>

            {/* Info */}
            <div id="product-info" className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    href={`/categories/${data.category?._id}`}
                    className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
                  >
                    {data.category?.name}
                  </Link>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {data.brand?.name}
                  </span>
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {data.title}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <Stars rating={data.ratingsAverage} />
                  <span className="text-sm text-gray-600">
                    {data.ratingsAverage} ({data.ratingsQuantity} reviews)
                  </span>
                </div>

                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {data.priceAfterDiscount || data.price} EGP
                  </span>
                  {data.priceAfterDiscount && (
                    <span className="text-lg text-gray-400 line-through">
                      {data.price} EGP
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${
                      inStock
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        inStock ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {data.description}
                  </p>
                </div>

                {inStock && (
                  <ProductActions
                    id={data.id}
                    max={data.quantity}
                    price={data.priceAfterDiscount || data.price}
                  />
                )}

                {/* Trust badges */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <FaTruckFast />,
                        title: "Free Delivery",
                        sub: "Orders over $50",
                      },
                      {
                        icon: <FaUndo />,
                        title: "30 Days Return",
                        sub: "Money back",
                      },
                      {
                        icon: <FaShieldHalved />,
                        title: "Secure Payment",
                        sub: "100% Protected",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductTabs product={data} />
      <SimilarProducts products={related} />
    </>
  );
}

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-wrap justify-center items-center">
          <InfinitySpin
            visible={true}
            height="200"
            width="200"
            color="green"
            ariaLabel="loading"
          />
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
