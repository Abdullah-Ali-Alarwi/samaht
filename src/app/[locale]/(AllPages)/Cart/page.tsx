"use client";

import useCartStore from "@/src/store/CartStore";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% ضريبة
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="w-[90%] m-auto mt-5 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <p className="text-gray-500">Add some products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] m-auto mt-5 flex flex-col lg:flex-row gap-6">
      {/* جدول المنتجات */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">
          Your Cart Items <span className="text-yellow-500">({cart.length})</span>
        </h1>

        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Item</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border">
                <td className="border p-2 flex items-center gap-2">
                  <Image src={item.thumbnail} alt={item.title} width={80} height={80} />
                  <div className="flex flex-col text-left">
                    <span>{item.title}</span>
                    <span className="text-gray-500 text-sm">{item.category}</span>
                  </div>
                </td>
                <td className="border p-2">${item.price.toFixed(2)}</td>
                <td className="border p-2">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="bg-gray-200 px-2 rounded"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 rounded"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="border p-2 flex justify-center items-center gap-2">
                  ${(item.price * item.quantity).toFixed(2)}
                  <button
                    className="bg-red-500 text-white px-2 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ملخص الطلب */}
      <div className="w-full lg:w-1/3 border p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold mt-4 text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => router.push("/checkout")}
          className="w-full mt-6 bg-black text-white p-3 rounded-md hover:bg-gray-800 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
