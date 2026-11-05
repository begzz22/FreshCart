"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import image from "../../../../public/images/main-slider.png";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    text: "Get 20% off your first order",
    primary: {
      label: (
        <>
          <span className="text-green-500">Shop Now</span>
        </>
      ),
      href: "/products",
    },
    secondary: { label: "View Deals", href: "/deals" },
  },
  {
    title: "Premium Quality Guaranteed",
    text: "Fresh from farm to your table",
    primary: {
      label: (
        <>
          <span className="text-blue-500">Shop Now</span>
        </>
      ),
      href: "/products",
    },
    secondary: { label: "Learn More", href: "/about" },
  },
  {
    title: "Fast & Free Delivery",
    text: "Same day delivery available",
    primary: {
      label: (
        <>
          <span className="text-purple-500">Order Now</span>
        </>
      ),
      href: "/products",
    },
    secondary: { label: "Delivery Info", href: "/delivery" },
  },
];

const MainSlider = () => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        pagination={{ clickable: true }}
        navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className="h-100 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="w-full h-full py-20 p-4 text-white bg-linear-to-r from-primary-500/90 to-primary-500/50">
                <div className="container mx-auto h-full content-center px-4">
                  <h2 className="text-3xl font-bold mb-4 max-w-96">
                    {s.title}
                  </h2>
                  <p>{s.text}</p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={s.primary.href}
                      className="inline-block px-6 py-2 rounded-lg font-semibold bg-white border-2 border-white/50 text-primary-600 hover:scale-105 transition-transform"
                    >
                      {s.primary.label}
                    </Link>
                    <Link
                      href={s.secondary.href}
                      className="inline-block px-6 py-2 rounded-lg font-semibold bg-transparent border-2 border-white/50 text-white hover:scale-105 transition-transform"
                    >
                      {s.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        aria-label="Previous slide"
        className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-primary-500 hover:text-primary-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <FaChevronLeft className="text-lg" />
      </button>
      <button
        aria-label="Next slide"
        className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-primary-500 hover:text-primary-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <FaChevronRight className="text-lg" />
      </button>
    </div>
  );
};

export default MainSlider;
