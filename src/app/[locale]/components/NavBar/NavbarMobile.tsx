"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface NavbarMobileProps {
  onClose: () => void;
}

export default function NavbarMobile({ onClose }: NavbarMobileProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const tIndex = useTranslations("Index");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <nav className="flex items-center lg:hidden ">
      <button
        ref={buttonRef}
        className="transition rounded-md text-lg hover:text-yellow-400 flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        {t("Menu")}
        {open ? (
          <ChevronDown size={28} className="text-yellow-500" />
        ) : (
          <ChevronRight size={28} className="text-gray-500" />
        )}
      </button>

      {/* Side Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 mt-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isRTL ? "right-0" : "left-0"
        } ${open ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}`}
      >
        {/* زر إغلاق */}
        <div className="flex justify-end p-4">
          <button onClick={() => { setOpen(false); onClose(); }}>
            <ChevronDown size={28} className="text-gray-500" />
          </button>
        </div>

        {/* عنوان */}
        <h2 className="px-6 py-2 font-semibold text-gray-700 border-b">
          {tIndex("List")}
        </h2>

        {/* روابط */}
        <div className="flex flex-col py-2 space-y-2">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-6 py-3 text-lg transition rounded-md break-words ${
                  isActive
                    ? "text-yellow-500 font-semibold bg-yellow-50"
                    : "text-gray-700 hover:text-yellow-500 hover:bg-gray-100"
                }`}
                onClick={() => { setOpen(false); onClose(); }}
              >
                {t(link.label)}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/80"
          onClick={() => { setOpen(false); onClose(); }}
        ></div>
      )}
    </nav>
  );
}
