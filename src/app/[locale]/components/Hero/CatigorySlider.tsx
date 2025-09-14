import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CartCategory from "../Ui/CartCategory"
import useProductStore from "@/src/store/ProductsStore";

export default function MainHero() {
  const { products } = useProductStore();

  return (
    <div className="w-[90%] lg:w-full m-auto h-[250px] flex items-center justify-center">
      <Carousel className="w-[90%] flex m-auto mt-5">
        <CarouselPrevious />
        <CarouselNext />
        <CarouselContent className="flex">
          {products.map((product, i) => (
            <CarouselItem
              key={i}
              // عنصرين في أصغر الشاشات
              className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="w-[95%] m-auto h-[200px]  rounded-sm flex items-center justify-center">
                <CartCategory product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
