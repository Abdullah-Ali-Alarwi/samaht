"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const tIndex = useTranslations("Index");

  const menuRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { href: "/ProductPage", label: "products" },
    { href: "/order-success", label: "order-success" },
    { href: "/subcription", label: "subcription" },
    { href: "/wishlist", label: "wishlist" },
    { href: "/checkout", label: "checkout" },
    { href: "/ContactUs", label: "ContactUs" },
    { href: "/FAQ", label: "FAQ" },
  ];

  // ✅ إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="relative w-[80%] z-50" ref={menuRef}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* روابط الديسكتوب */}
        <div className="hidden lg:flex space-x-6 rtl:space-x-reverse">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition relative ${
                  isActive
                    ? "text-yellow-500 m-5 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-yellow-500"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                {t(link.label)}
              </Link>
            );
          })}
        </div>

        {/* زر الموبايل */}
        <h1 className="block lg:hidden">{tIndex("List")}</h1>
        <button
          className="lg:hidden transition"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronDown size={28} className="text-yellow-500" />
          ) : (
            <ChevronRight size={28} className="text-gray-500" />
          )}
        </button>
      </div>

      {/* قائمة الموبايل */}
      {open && (
        <div className="absolute top-16 left-0 w-[300px] bg-white shadow-lg lg:hidden py-4 space-y-3">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-6 py-2 transition ${
                  isActive
                    ? "text-yellow-500 font-semibold bg-yellow-50 rounded-md"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
                onClick={() => setOpen(false)}
              >
                {t(link.label)}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
