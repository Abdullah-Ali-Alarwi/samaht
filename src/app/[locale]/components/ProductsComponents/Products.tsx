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
  const filteredProducts = getFilteredProducts(); // نسحبها من الـ store

  if (loading) {
    return <p className="text-center text-gray-500">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-full mt-8">

      <h1 className="text-2xl font-bold mb-4 text-left m-10 text-yellow-400">
        {title}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد نتائج مطابقة</p>
      ) : (
        <div className="w-[55%] md:w-[90%] lg:w-[90%] flex m-auto mt-5">
      
          <Carousel className="w-[90%] m-auto mt-5">
            <CarouselPrevious />
            <CarouselNext />
            <CarouselContent>
              {filteredProducts.map((product: Product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-full m-auto sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 "
                >
                  <CartItem product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
}
