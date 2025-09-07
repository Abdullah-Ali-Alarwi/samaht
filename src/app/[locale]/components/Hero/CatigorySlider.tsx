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
    <div className="w-[90%]  lg:w-full m-auto  h-[250px] flex items-center justify-center">
      <Carousel className=" w-[55%] md:w-[90%] lg:w-[90%] flex    m-auto mt-5">
        <CarouselPrevious />
        <CarouselNext />
        <CarouselContent>
          {products.map((product, i) => (
            <CarouselItem
              key={i}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="w-[200px] h-[200px] bg-gray-300 rounded-sm flex items-center justify-center">
                <CartCategory product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
