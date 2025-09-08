"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { useTranslations } from "next-intl";
import useProductStore from "@/src/store/ProductsStore";
import { usePathname } from "next/navigation"; // App Router

export default function AllCategoryList() {
  const { products, setSelectedCategory } = useProductStore();
  const t = useTranslations("Index");
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // RTL بناءً على المسار
  const isRTL = pathname.startsWith("/ar");

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // استخراج الكاتيجوري الفريدة من المنتجات
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    setCategories(uniqueCategories);
  }, [products]);

  return (
    <div className="relative inline-block z-50" ref={dropdownRef} dir={isRTL ? "rtl" : "ltr"}>
      <button
        className="text-2xl px-4 py-2 rounded-md flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="hidden w-[150px] lg:flex text-gray-800 text-[18px]">{t("all_sections")}</p>
        <CiMenuBurger />
      </button>

      {isOpen && (
        <ul
          className={`absolute mt-1 w-screen max-h-[60vh] overflow-y-auto text-sm bg-white border rounded-md shadow-lg
                      grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 z-50
                      ${isRTL ? "left-[-82px] text-right" : "right-[-82px] text-left"}`}
        >
          {/* خيار لكل الأقسام */}
          <li
            className="relative hover:bg-gray-200 px-4 py-2 cursor-pointer font-semibold"
            onClick={() => setSelectedCategory(null)}
          >
            {t("all_sections")}
          </li>

          {/* عرض الكاتيجوري */}
          {categories.map((cat, index) => (
            <li
              key={index}
              className="relative hover:bg-gray-200 px-4 py-2 cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
