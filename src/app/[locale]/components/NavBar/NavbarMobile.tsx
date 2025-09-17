"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface NavbarMobileProps {
  onClose: () => void;
}

export default function NavbarMobile({ onClose }: NavbarMobileProps) {
  const [open, setOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const pathname = usePathname();

  const tNavbar = useTranslations("Navbar");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsRTL(localStorage.getItem("locale") === "ar");
  }, []);

  // إغلاق القائمة عند النقر خارجها
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const links = [
    { href: "/ProductPage", label: "products" },
    { href: "/order-success", label: "order-success" },
    { href: "/subcription", label: "subcription" },
    { href: "/wishlist", label: "wishlist" },
    { href: "/checkout", label: "checkout" },
    { href: "/ContactUs", label: "ContactUs" },
    { href: "/FAQ", label: "FAQ" },
  ];

  return (
    <nav className="flex items-center lg:hidden ">
      {/* زر القائمة */}
      <button
        ref={buttonRef}
        className="transition rounded-md text-lg hover:text-yellow-400 flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
      
   
          <MdMenuOpen  size={28} className="text-gray-700 " />
       
          {tNavbar("List")}
      </button>

      {/* القائمة الجانبية */}
      <div
        ref={menuRef}
        className={`fixed top-0 mt-0 h-full w-64 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isRTL ? "right-0" : "left-0"
        } ${open ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}`}
      >
        {/* زر إغلاق */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              setOpen(false);
              onClose();
            }}
          >
            <IoClose size={28} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* عنوان القائمة */}
        <h2 className="px-6 py-2 font-semibold text-gray-700 border-b">
          {tNavbar("List")}
        </h2>

        {/* روابط القائمة */}
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
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
              >
                {tNavbar(link.label)}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay عند فتح القائمة */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/80"
          onClick={() => {
            setOpen(false);
            onClose();
          }}
        ></div>
      )}
    </nav>
  );
}
