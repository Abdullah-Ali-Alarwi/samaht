import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/src/types/Product";

export default function CartCategory({ product }: { product: Product }) {
  return (
    <div className="w-[200px] m-auto h-[200px] bg-gray-200 shadow-md rounded-lg relative overflow-hidden">
      <Link href={`/ProductPage`}>
        {/* صورة المنتج */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className="object-cover w-full h-full m-auto"
        />
        {/* الكاتيجوري فوق الصورة في الوسط */}
        <div className="absolute m-auto inset-0 flex items-center justify-center bg-black/30">
          <h2 className="text-white font-bold text-lg">{product.category}</h2>
        </div>
      </Link>
    </div>
  );
}
