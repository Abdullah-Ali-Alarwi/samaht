"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { SlBasketLoaded } from "react-icons/sl";
import { FaHeart, FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";

import logo from "@/public/logo.svg";
import SearchNav from "../Ui/SearchNav";
import ChangeLanguage from "../Ui/ChangeLanguage";
import useWishlistStore from "@/src/store/WishlistStore";
import useCartStore from "@/src/store/CartStore";
import SideMenu from "./SideMenu"; // القائمة الجانبية
import { useRouter } from "@/src/i18n/navigation";

export default function Header2() {
  const router = useRouter();
  const t = useTranslations("Index");
  const { wishlist } = useWishlistStore();
  const { cart } = useCartStore();
  const { data: session } = useSession();

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const direction = typeof document !== "undefined" ? document.dir : "ltr";

  const handleSignIn = () => router.push("/signin");
  const handleSignOut = () => signOut();

  return (
    <header className="   bg-[#FEFDE7] lg:bg-white border-2 border-gray-200 mb-[-10px] lg:mb-0 ">
      {/* Desktop Header */}
      <div className="hidden lg:flex w-[95%] items-center justify-between p-2 text-gray-600 px-3.5 m-auto">
        <Link href="/">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>

        <div className="w-[40%]">
          <SearchNav />
        </div>

        <div className="flex items-center justify-around w-1/5 text-2xl relative">
          <ChangeLanguage />
          <Link href="/wishlist">
            {wishlist.length > 0 ? (
              <div className="text-red-600">
                <FaHeart />
              </div>
            ) : (
              <GoHeart />
            )}
          </Link>
          <div className="flex items-center gap-1">
            <span>{cart.length}</span>
            <Link href="/Cart">
              <SlBasketLoaded />
            </Link>
          </div>

          {/* User Menu */}
          {session ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "avatar"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                    {session.user?.name?.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute mt-2 w-48 border rounded shadow-lg bg-white p-2 z-50 ${
                    direction === "rtl" ? "left-0" : "right-0"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 border-b pb-2 mb-2">
                    {session.user?.image && (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "avatar"}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                    )}
                    <span className="font-semibold text-[14px]">
                      {session.user?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {session.user?.email}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-[14px] gap-2 w-full justify-center text-red-600 hover:text-red-800"
                  >
                    <BiLogOut />
                    {t("signOut")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleSignIn} className="text-2xl">
              <FaRegUser />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden w-full border-t border-gray-200 flex justify-between items-center mb-0 p-5">
        <Link href="/">
          <Image src={logo} alt="Logo" width={80} height={80} />
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center text-2xl gap-1">
            <span>{cart.length}</span>
            <Link href="/Cart">
              <SlBasketLoaded />
            </Link>
          </div>

          {/* User Icon opens SideMenu */}
          <button onClick={() => setIsSideMenuOpen(true)}>
            <FaRegUser className="text-2xl" />
          </button>
        </div>
      </div>
      

      {/* Mobile Search */}
      <div className="lg:hidden m-2 flex w-full">
        <SearchNav />
      </div>

      {/* SideMenu for Mobile (only when open) */}
      <div className="lg:hidden">
        {isSideMenuOpen && (
          <SideMenu
            isOpen={isSideMenuOpen}
            onClose={() => setIsSideMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
