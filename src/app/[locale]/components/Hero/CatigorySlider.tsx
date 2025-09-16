"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper"; // النوع الصحيح
import "swiper/css";

import CartCategory from "../Ui/CartCategory";
import useProductStore from "@/src/store/ProductsStore";

export default function MainHero() {
  const { products } = useProductStore();
  const swiperRef = useRef<SwiperType | null>(null); // النوع الصحيح

  if (!products || products.length === 0) {
    return (
      <div className="w-[90%] lg:w-full m-auto h-[250px] flex items-center justify-center">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] lg:w-full m-auto relative pt-10">
      {/* الأسهم فوق السلايدر على الجهة اليسرى */}
      <div className="flex gap-2 mx-7 absolute top-0 left-0 z-20">
        <button
          className="text-gray-400 hover:text-yellow-400 text-2xl font-bold "
          onClick={() => swiperRef.current?.slidePrev()}
        >
          &#8592;
        </button>
        <button
          className="text-gray-400 hover:text-yellow-400 text-2xl font-bold "
          onClick={() => swiperRef.current?.slideNext()}
        >
          &#8594;
        </button>
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // ربط المرجع بالكائن
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((product, i) => (
          <SwiperSlide key={i}>
            <div className="w-[95%] m-auto h-[220px] rounded-sm flex items-center justify-center">
              <CartCategory product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
