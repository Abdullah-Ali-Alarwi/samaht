"use client";
import React, { useState } from "react";
import Image from "next/image";
import useProductStore from "@/src/store/ProductsStore";
import { useParams, useRouter } from "next/navigation";
import useCartStore from "@/src/store/CartStore";
import BottomSheet from "./BottomSheet";

export default function ProductDetails() {
  const { addToCart } = useCartStore();
  const params = useParams();
  const router = useRouter();
  const { products } = useProductStore();
  const [openSheet, setOpenSheet] = useState(false);
  const [mode, setMode] = useState("cart"); // "cart" أو "order"

  const Item = products.find((product) => String(product.id) === params.id);

  if (!Item) {
    return <p className="text-center my-10 text-red-500">Product not found.</p>;
  }

  return (
    <div className="p-6 mt-[200px] flex-col lg:flex-row w-full lg:w-[70%] m-auto flex gap-5">
      {/* الصور */}
      <div className="images w-full m-auto lg:w-1/3">
        <Image
          className="rounded-md m-auto"
          src={Item.thumbnail ?? "/placeholder.png"}
          width={200}
          height={200}
          alt={Item.title || "Product Image"}
        />
      </div>

      {/* المعلومات */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3 justify-around">
        <p className="text-gray-600 text-sm">{Item.title}</p>
        <p className="text-gray-600 text-sm">{Item.price} $</p>

        {/* الأزرار */}
        <div className="flex gap-3 justify-between items-center w-full lg:w-[80%]">
          <button
            onClick={() => {
              setMode("cart");
              setOpenSheet(true);
            }}
            className="hover:bg-amber-500 text-white w-[60%] py-3 px-3 border-1 bg-amber-400 border-amber-400 rounded-md"
          >
            Add to Cart
          </button>

          <button
            onClick={() => {
              setMode("order");
              setOpenSheet(true);
            }}
            className="w-[40%] hover:bg-amber-400 hover:text-white py-3 px-3 border-1 border-amber-400 rounded-md"
          >
            Start Order
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        product={Item}
        onConfirm={(selected: typeof Item) => {
          addToCart(selected);
          if (mode === "order") {
            router.push("/checkout"); // ينقله لصفحة الطلب بعد الإضافة
          }
        }}
      />
    </div>
  );
}
