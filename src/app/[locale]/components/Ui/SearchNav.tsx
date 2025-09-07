"use client";
import React from "react";
import { LuImage } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import useProductStore from "@/src/store/ProductsStore";

export default function SearchNav() {
  const { searchQuery, setSearchQuery } = useProductStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // البحث يشتغل تلقائي لأنه مربوط بالـ store
    console.log("بحث عن:", searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[95%] m-auto items-center justify-between border-2 border-gray-300 h-[50px] rounded-2xl px-3"
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-[80%] outline-none"
      />

      <button type="button" className="text-gray-400 text-2xl">
        <LuImage />
      </button>

      <button
        type="submit"
        className="bg-yellow-300 text-white p-1 rounded-full text-2xl"
      >
        <IoSearch />
      </button>
    </form>
  );
}
