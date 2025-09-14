"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import item from "@/public/image/item.jpg";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Product } from "@/src/types/Product";
import useWishlistStore from "@/src/store/WishlistStore";

interface CartItemProps {
  product?: Product;
}

export default function CartItem({ product }: CartItemProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product) return null; // لو المنتج مش موجود ما نعرض شيء

  const liked = isInWishlist(product.id);

  const toggleLike = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const imageSrc: string | typeof item = product.thumbnail ?? item;

  return (
    <div
      className="
        h-[200px] sm:h-[250px] lg:h-[296px] 
        w-[95%] sm:w-full 
        rounded-2xl text-center border-b-2 border-gray-400 shadow-md overflow-hidden
        flex flex-col
        m-auto
      "
    >
      {/* حاوية الصورة */}
      <div className="relative w-full h-[80%]">
        <Link href={`/ProductPage/${product.id}`} className="block w-full h-full">
          <Image
            src={imageSrc}
            alt={product.title || "Product Image"}
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-full h-full rounded-md"
          />
        </Link>

        {/* أيقونة القلب */}
        {liked ? (
          <FaHeart
            className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer"
            onClick={toggleLike}
          />
        ) : (
          <CiHeart
            className="absolute top-2 right-2 text-gray-400 text-2xl cursor-pointer"
            onClick={toggleLike}
          />
        )}
      </div>

      <p className="truncate w-full cursor-default mt-1" title={product.title}>
        {product.title}
      </p>

      <div className="mt-1">
        <span className="font-semibold text-gray-800">{product.price} $</span>
      </div>
    </div>
  );
}
