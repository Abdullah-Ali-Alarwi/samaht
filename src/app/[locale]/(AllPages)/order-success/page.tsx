"use client";

import React from "react";
import useOrderStore from "@/src/store/OrderStore";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OrderSuccess() {
  const t = useTranslations("Index"); // اسم namespace في ملفات الترجمة
  const { orders } = useOrderStore();

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("noOrders")}</h1>
        <p>{t("noOrdersMessage")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("yourOrders")}</h1>

      {orders
        .slice()
        .reverse()
        .map((order) => (
          <div
            key={order.id}
            className="border rounded-md shadow-md mb-6 p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                {t("orderDate")}: {new Date(order.date).toLocaleString()}
              </h2>
              <span className="font-bold text-yellow-500">
                {t("total")}: ${order.total.toFixed(2)}
              </span>
            </div>

            <div className="mb-2">
              <p>
                {t("customer")}: {order.firstName} {order.lastName}
              </p>
              <p>
                {t("email")}: {order.email}
              </p>
              <p>
                {t("phone")}: {order.phone}
              </p>
              {order.whatsappNumber && (
                <p>
                  {t("whatsapp")}: {order.whatsappNumber}
                </p>
              )}
              <p>
                {t("address")}: {order.address}
              </p>
            </div>

            <table className="w-full border-collapse border border-gray-300 text-center mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">{t("image")}</th>
                  <th className="border p-2">{t("product")}</th>
                  <th className="border p-2">{t("price")}</th>
                  <th className="border p-2">{t("quantity")}</th>
                  <th className="border p-2">{t("total")}</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2">${item.price.toFixed(2)}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
