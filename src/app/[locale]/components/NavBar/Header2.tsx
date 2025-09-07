"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { SlBasketLoaded } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";

import logo from "@/public/logo.svg";
import SearchNav from "../Ui/SearchNav";
import ChangeLanguage from "../Ui/ChangeLanguage";
import useWishlistStore from "@/src/store/WishlistStore";
import useCartStore from "@/src/store/CartStore";
import UserMenu from "@/src/app/[locale]/components/NavBar/UserMenu";
import { useRouter } from "@/src/i18n/navigation";

export default function Header2() {
  const router = useRouter();
  const t = useTranslations("Index");

  const { wishlist } = useWishlistStore();
  const { cart } = useCartStore();

  return (
    <header className="border-b-2 bg-white border-gray-300">
      {/* Desktop Header */}
      <div className="w-[95%] flex items-center justify-between p-2 text-gray-600 px-3.5 m-auto">
        {/* Logo */}
        <Link className="hidden lg:flex" href="/">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>

   

        {/* Search (desktop) */}
        <div className="hidden lg:flex w-[40%]">
          <SearchNav />
        </div>

        {/* Icons (desktop) */}
        <div className="hidden lg:flex items-center justify-around w-1/5 text-2xl">
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
        </div>
             {/* User Info Component */}
        <UserMenu className="hidden lg:flex" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden w-full border-t border-gray-200">
        
        <div className="flex items-center justify-between w-full p-2 px-3">
          <Link href="/">
            <Image src={logo} alt="Logo" width={80} height={80} />
          </Link>

      

          <div className="flex items-center gap-1">
            <span>{cart.length}</span>
            <Link href="/Cart">
              <SlBasketLoaded className="text-2xl" />

            </Link>
             
             <ChangeLanguage/>
             <UserMenu  />
          </div>
            {/* User Info Component */}
       
        </div>

        {/* Search (mobile) */}
        <div className="m-2 flex w-full">
          <SearchNav />
        </div>
      </div>
    </header>
  );
}
