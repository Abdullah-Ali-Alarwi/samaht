"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { useTranslations } from "next-intl";
import useProductStore from "@/src/store/ProductsStore";
import { usePathname } from "next/navigation";

export default function AllCategoryList() {
  const { products, selectedCategory, setSelectedCategory } = useProductStore();
  const t = useTranslations("Index");
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isRTL = pathname.startsWith("/ar");

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // استخراج الكاتيجوري الفريدة
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    setCategories(uniqueCategories);
  }, [products]);

  // دالة لاختيار القسم وإغلاق القائمة
  const handleSelectCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    setIsOpen(false);
  };

  // اسم القسم الذي سيتم عرضه في الزر
  const displayCategory = selectedCategory ? selectedCategory : t("all_sections");

  return (
    <div className="relative inline-block z-50 w-full lg:w-auto" dir={isRTL ? "rtl" : "ltr"}>
      <button
        ref={buttonRef}
        className="w-full lg:w-auto text-2xl px-4 py-2 rounded-md flex items-center justify-between lg:justify-start gap-2  lg:bg-gray-50 hover:bg-gray-200 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-800 text-[18px] w-[150px] font-semibold">{displayCategory}</span>
        <CiMenuBurger />
      </button>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className={`absolute top-full mt-1 w-full lg:w-[300px] max-h-[60vh] overflow-y-auto
                     bg-white border rounded-md shadow-lg z-50
                     ${isRTL ? "right-0 text-right" : "left-0 text-left"}
                     divide-y divide-gray-200`}
        >
          {/* خيار كل الأقسام */}
          <li
            className="px-4 py-3 cursor-pointer font-semibold hover:bg-gray-100"
            onClick={() => handleSelectCategory(null)}
          >
            {t("all_sections")}
          </li>

          {/* عرض الكاتيجوري */}
          {categories.map((cat, index) => (
            <li
              key={index}
              className="px-4 py-3 cursor-pointer hover:text-yellow-500 hover:bg-gray-100 break-words"
              onClick={() => handleSelectCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
