"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaTimes, FaBell, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import ChangeLanguage from "../Ui/ChangeLanguage"; 
import useWishlistStore from "@/src/store/WishlistStore";
import { useTranslations } from "next-intl";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { wishlist } = useWishlistStore();
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("Index");

  const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");

  // ضبط اتجاه النص حسب اللغة
  useEffect(() => {
    const lang = localStorage.getItem("locale") || "en";
    setDirection(lang === "ar" ? "rtl" : "ltr");
  }, []);

  const handleSignIn = () => {
    onClose();
    router.push("/signin");
  };

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <>
      {/* Overlay خلف القائمة */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* القائمة الجانبية */}
      <div
        dir={direction}
        className={`fixed top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* زر إغلاق */}
          <div className="flex justify-end p-4">
            <button onClick={onClose}>
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* بيانات المستخدم إذا كان مسجّل دخول */}
          {session?.user && (
            <div className="flex flex-col items-center p-4 gap-2 border-b border-gray-200">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "avatar"}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-semibold">
                    {session.user.name?.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-lg font-semibold truncate">{session.user.name}</span>
            </div>
          )}

          {/* روابط القائمة */}
          <nav className="flex flex-col p-4 gap-4 text-gray-700">
            {/* تغيير اللغة */}
            <div>
              <h3 className="text-gray-500 mb-2">{t("language")}</h3>
              <ChangeLanguage />
            </div>

            {/* المفضلة */}
            <Link
              href="/wishlist"
              className="flex items-center gap-2 text-lg hover:text-yellow-500"
              onClick={onClose}
            >
              {wishlist.length > 0 ? <span className="text-red-600">❤️</span> : <GoHeart />}
              {t("wishlist")}
            </Link>

            {/* الإشعارات */}
            <Link
              href="/notifications"
              className="flex items-center gap-2 text-lg hover:text-yellow-500"
              onClick={onClose}
            >
              <FaBell />
              {t("notifications")}
            </Link>

            {/* تسجيل الدخول أو إنشاء حساب */}
            {!session?.user && (
              <>
                <button
                  onClick={handleSignIn}
                  className="flex items-center gap-2 text-lg hover:text-yellow-500"
                >
                  <FaSignInAlt />
                  {t("signIn")}
                </button>
                <Link
                  href="/register"
                  className="flex items-center gap-2 text-lg hover:text-yellow-500"
                  onClick={onClose}
                >
                  <FaUserPlus />
                  {t("register")}
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* زر تسجيل الخروج أسفل القائمة إذا كان مسجّل دخول */}
        {session?.user && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 w-full justify-center text-lg text-red-600 hover:text-red-800"
            >
              <BiLogOut />
              {t("signOut")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
