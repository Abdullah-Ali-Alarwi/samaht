"use client";

import React from "react";
import CartItem from "../Ui/CartItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/src/types/Product";
import useProductStore from "@/src/store/ProductsStore";

interface ProductsProps {
  title: string;
}

export default function Products({ title }: ProductsProps) {
  const { loading, error, getFilteredProducts } = useProductStore();
  const filteredProducts = getFilteredProducts();

  if (loading) {
    return <p className="text-center text-gray-500">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-full mt-8">
      <h1 className="text-2xl font-bold mb-4 text-left mx-10 text-yellow-400">
        {title}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد نتائج مطابقة</p>
      ) : (
        <div className="w-[90%] mx-auto relative mt-5">
          <Carousel className="w-full">
            {/* أزرار التنقل */}
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2">
              &#10094;
            </CarouselPrevious>
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2">
              &#10095;
            </CarouselNext>

            <CarouselContent className="flex">
              {filteredProducts.map((product: Product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-2"
                >
                  <div className="w-full h-[200px] bg-gray-100 rounded flex items-center justify-center">
                    <CartItem product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
}
