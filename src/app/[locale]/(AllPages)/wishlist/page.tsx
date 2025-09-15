"use client";

import CartItem from "@/src/app/[locale]/components/Ui/CartItem";
import useWishlistStore from "@/src/store/WishlistStore";
import React from "react";

export default function WishlistPage() {
  const { wishlist } = useWishlistStore();

  return (
    <div className="w-[90%] m-auto mt-[200px]">
      <h1 className="text-left text-2xl font-bold my-5 text-yellow-400">
        Favorite Products
      </h1>

      <div className="flex gap-3 flex-wrap m-auto justify-center">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <CartItem key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">لا توجد منتجات مضافة في المفضلة.</p>
        )}
      </div>
    </div>
  );
}
