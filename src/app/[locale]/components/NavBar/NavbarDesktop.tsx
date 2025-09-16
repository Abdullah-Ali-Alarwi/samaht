"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NavbarDesktop() {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

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

  return (
    <nav className="hidden lg:flex  container mx-auto px-4 items-center justify-between h-16 space-x-6 rtl:space-x-reverse">
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
    </nav>
  );
}
