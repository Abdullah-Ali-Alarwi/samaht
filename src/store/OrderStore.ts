"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// تعريف نوع الطلب
export interface Order {
  id: string; // يمكن استخدام uuid
  items: {
    id: string;
    title: string;
    quantity: number;
    price: number;
    thumbnail: string;
  }[];
  total: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  whatsappNumber?: string;
  date: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
}

const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => localStorage), // ✅ JSON storage بدون undefined
    }
  )
);

export default useOrderStore;
