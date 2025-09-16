"use client";

import React, { useState } from "react";
import useCartStore from "@/src/store/CartStore";
import useOrderStore from "@/src/store/OrderStore";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const handlePayment = () => {
    if (!firstName || !lastName || !email || !address || !phone) {
      toast.error("يرجى تعبئة جميع الحقول!");
      return;
    }

    if (cart.length === 0) {
      toast.error("سلتك فارغة!");
      return;
    }

    setLoading(true);

    const newOrder = {
      id: uuidv4(),
      items: cart.map(item => ({
        id: item.id.toString(),
        title: item.title,
        quantity: item.quantity,
        price: item.price || 0,
        thumbnail: item.thumbnail,
      })),
      total: totalPrice,
      firstName,
      lastName,
      email,
      phone,
      whatsappNumber,
      address,
      date: new Date().toISOString(),
    };

    addOrder(newOrder);

    setTimeout(() => {
      toast.success("تمت العملية بنجاح وحفظ الطلب!");
      setLoading(false);
      clearCart();
      router.push("/order-success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setWhatsappNumber("");
    }, 1000);
  };

  return (
    <div className="flex mt-[200px] flex-col lg:flex-row lg:justify-around w-[95%] mx-auto my-6 gap-6">
      {/* بيانات العميل */}
      <div className="flex flex-col gap-4 lg:w-[50%] p-4 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">مرحلة الطلب</h1>
        <h2 className="text-xl font-semibold mb-2">معلومات العميل</h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="الاسم الاول"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded w-full bg-gray-100 p-3"
          />
          <input
            type="text"
            placeholder="الاسم الاخير"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded w-full bg-gray-100 p-3"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="tel"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded w-full bg-gray-100 p-3"
          />
          <input
            type="tel"
            placeholder="رقم الواتساب"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="border rounded w-full bg-gray-100 p-3"
          />
        </div>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full bg-gray-100 p-3"
        />

        <input
          type="text"
          placeholder="العنوان"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded w-full bg-gray-100 p-3"
        />

        {/* جدول السلة للشاشات الكبيرة */}
        <div className="hidden lg:block mt-4">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">الصورة</th>
                <th className="border p-2">المنتج</th>
                <th className="border p-2">السعر</th>
                <th className="border p-2">الكمية</th>
                <th className="border p-2">الإجمالي</th>
                <th className="border p-2">حذف</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">
                    <Image src={item.thumbnail} alt={item.title} width={50} height={50} />
                  </td>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">
                    ${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                  </td>
                  <td className="border p-2 flex justify-center items-center gap-2">
                    <button className="bg-gray-200 px-2 rounded" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="bg-gray-200 px-2 rounded" onClick={() => increaseQuantity(item.id)}>+</button>
                  </td>
                  <td className="border p-2">
                    ${((item.price || 0) * item.quantity).toFixed(2)}
                  </td>
                  <td className="border p-2">
                    <button className="bg-red-500 text-white px-2 rounded" onClick={() => removeFromCart(item.id)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* قائمة السلة على الشاشات الصغيرة */}
        <div className="lg:hidden mt-4 flex flex-col gap-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded shadow">
              <div className="flex items-center gap-3">
                <Image src={item.thumbnail} alt={item.title} width={50} height={50} />
                <div className="flex flex-col">
                  <span className="font-semibold">{item.title}</span>
                  <span>${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <button className="bg-gray-200 px-2 rounded" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="bg-gray-200 px-2 rounded" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="bg-red-500 text-white px-2 rounded" onClick={() => removeFromCart(item.id)}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ملخص السلة */}
      <div className="lg:w-[30%] p-4 bg-white shadow-md rounded-md flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-2">ملخص الطلب</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.title} x {item.quantity}</span>
            <span>${((item.price || 0) * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2 border-t border-gray-300 pt-2">
          <span>المجموع الكلي:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-yellow-500 text-white p-3 rounded-md mt-4 hover:bg-yellow-600 transition"
        >
          {loading ? "جارٍ التحويل..." : "الدفع وإرسال الطلب"}
        </button>
      </div>
    </div>
  );
}
