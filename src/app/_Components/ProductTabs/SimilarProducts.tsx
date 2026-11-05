"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Product } from "@/types/product.t";
import HomeCard from "@/app/_Components/HomeCard/HomeCard";

export default function SimilarProducts({ products }: { products: Product[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!products.length) return null;

  return (
    <section id="similar-products" className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:cursor-pointer text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition"
            >
              <FaChevronLeft />
              <span className="sr-only">Previous</span>
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:cursor-pointer text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition"
            >
              <FaChevronRight />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <HomeCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
