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

  const isRTL = pathname.startsWith("/ar");

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

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
    <nav className="relative w-full z-50" ref={menuRef}>
      {/* روابط الديسكتوب */}
      <div className="hidden lg:flex   mt-[140px]container mx-auto px-4 items-center justify-between h-16 space-x-6 rtl:space-x-reverse">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition relative px-2 py-1 rounded-md ${
                isActive
                  ? "text-yellow-500 font-semibold bg-yellow-100"
                  : "text-gray-700 hover:text-yellow-600"
              }`}
            >
              {t(link.label)}
            </Link>
          );
        })}
      </div>

      {/* زر الموبايل */}
      <div className="flex items-center lg:hidden p-2 justify-end">
        <button
          className="transition p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronDown size={28} className="text-yellow-500" />
          ) : (
            <ChevronRight size={28} className="text-gray-500" />
          )}
        </button>
      </div>

      {/* Side Menu للموبايل */}
      <div
        className={`fixed mt-0 top-0 bg-amber-200 ${isRTL ? "right-0" : "left-0"} h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
        }`}
      >
        {/* زر إغلاق */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <ChevronDown size={28} className="text-gray-500" />
          </button>
        </div>

        {/* عنوان */}
        <h2 className="px-6 py-2 font-semibold text-gray-700 border-b">
          {tIndex("List")}
        </h2>

        {/* الروابط */}
        <div className="flex flex-col py-2 space-y-1">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-6 py-3 transition break-words rounded-md ${
                  isActive
                    ? "text-yellow-500 font-semibold bg-yellow-50"
                    : "text-gray-700 hover:text-yellow-600 hover:bg-gray-100"
                }`}
                onClick={() => setOpen(false)}
              >
                {t(link.label)}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay عند فتح القائمة */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
}
