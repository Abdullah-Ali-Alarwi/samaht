"use client";
import React from "react";
import Image from "next/image";
import useProductStore from "@/src/store/ProductsStore";
import { useParams } from "next/navigation";
import useCartStore from "@/src/store/CartStore";
import Link from "next/link";

export default function ProductDetails() {
  const { addToCart } = useCartStore();
  const params = useParams();
  const { products } = useProductStore();

  // إيجاد المنتج الحالي حسب ID
  const Item = products.find((product) => String(product.id) === params.id);

  if (!Item) {
    return <p className="text-center my-10 text-red-500">Product not found.</p>;
  }

  return (
    <div className="p-6 flex-col lg:flex-row w-full lg:w-[70%] m-auto flex gap-5">
      
      {/* قسم الصور */}
      <div className="images w-full m-auto lg:w-1/3">
        {/* الصورة الرئيسية */}
        <Image
          className="rounded-md m-auto"
          src={Item.thumbnail ?? "/placeholder.png"} // صورة افتراضية إذا لم توجد
          width={200}
          height={200}
          alt={Item.title || "Product Image"}
        />

        {/* صور صغيرة */}
        <div className="flex justify-between my-3">
          {Item.images?.map((e, index) =>
            e ? (
              <Image
                key={index}
                className="w-[60px] h-[60px] rounded-md"
                src={e}
                alt={`Thumbnail ${index + 1}`}
                width={60}
                height={60}
              />
            ) : null
          )}
        </div>
      </div>

      {/* قسم المعلومات */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3 justify-around">
        <p className="text-gray-600 text-sm">{Item.title}</p>
        <p className="text-gray-600 text-sm">{Item.price} $</p>

        {/* Color Classification */}
        <div className="text-gray-600 text-sm my-5">
          <p>Color Classification</p>
          {["Suit + Pants", "Suit + Pants + Skirt", "Suit + Skirt", "One-piece suit"].map((color, i) => (
            <button
              key={i}
              className="border-1 border-gray-400 rounded-md p-1 m-1 pointer hover:bg-amber-400 hover:border-0 hover:text-white"
            >
              {color}
            </button>
          ))}
        </div>

        {/* Size Selection */}
        <div className="text-gray-600 text-sm my-5">
          <p>Size</p>
          {["XXXL", "XXL", "L", "M", "S"].map((size, i) => (
            <button
              key={i}
              className="border-1 border-gray-400 rounded-md px-3 m-1 pointer hover:bg-amber-400 hover:border-0 hover:text-white"
            >
              {size}
            </button>
          ))}
        </div>

        {/* أزرار Cart */}
        <div className="flex gap-3 justify-between items-center w-full lg:w-[80%]">
          <Link
            href="/Cart"
            className="hover:bg-amber-500 text-white w-[60%] py-3 px-3 border-1 bg-amber-400 border-amber-400 rounded-md"
          >
            Start Order
          </Link>
          <button
            onClick={() => addToCart(Item)}
            className="w-[40%] hover:bg-amber-400 hover:text-white py-3 px-3 border-1 border-amber-400 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
