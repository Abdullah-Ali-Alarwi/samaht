"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { HiOutlineLogin } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";



interface UserMenuProps {
  className?: string;
}

export default function UserMenu({ className }: UserMenuProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen(!open);

  // إغلاق الـ Dropdown عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // تغيير اللغة
  const handleChangeLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang; // استبدل الجزء الأول بعد "/" بالـ locale الجديد
    const newPath = segments.join("/");
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className={`relative flex items-center ${className || ""}`} ref={dropdownRef}>
      {session ? (
        <>
          {/* Avatar + arrow */}
          <div  onClick={handleToggle} className="flex items-center">
          <div
           
            className="bg-gray-300 border border-yellow-500 hover:border-amber-700 w-[35px] h-[35px] p-3 lg:w-[45px] lg:h-[45px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer gap-1"
          >
            {session.user?.image ? (
             <Image
  src={session.user?.image || ""}
  alt={session.user?.name || "avatar"}
  width={35}
  height={35}
  className="rounded-full object-cover"
/>

            ) : (
              <span className="text-white font-semibold text-[12px]">
                {session.user?.name?.slice(0, 4).toUpperCase()}
              </span>
            )}
           
          </div>
            <IoIosArrowDown className="text-yellow-600 hover:text-yellow-700"/>
            </div>
        

          {/* Dropdown (mobile) */}
          {open && (
<div
  className={`absolute top-[50px] mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50 flex flex-col ${
    pathname.split("/")[1] === "ar" ? "left-0  text-start" : "right-0 text-end"
  }`}
>
              {/* اسم المستخدم */}
              <span className="px-4 py-2 border-b border-gray-200 text-gray-700 font-semibold truncate">
                {session.user?.name}
              </span>

              {/* زر تسجيل الخروج */}
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="px-4 py-2 text-red-500 text-left hover:bg-gray-100 flex items-center gap-2"
              >
                <BiLogOut />
                تسجيل الخروج
              </button>

              {/* تغيير اللغة */}
              <div className="px-4 py-2 border-t border-gray-200 flex flex-col gap-2">
                <button
                  onClick={() => handleChangeLanguage("ar")}
                  className={`text-left hover:text-yellow-500 ${
                    pathname.split("/")[1] === "ar" ? "text-yellow-500 font-semibold" : "text-gray-700"
                  }`}
                >
                  العربية
                </button>
                <button
                  onClick={() => handleChangeLanguage("en")}
                  className={`text-left hover:text-yellow-500 ${
                    pathname.split("/")[1] === "en" ? "text-yellow-500 font-semibold" : "text-gray-700"
                  }`}
                >
                  English
                </button>

                <Link href="/order-success"> My order </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => router.push("signin")}
          className="px-4 py-2 text-yellow-500 text-3xl flex items-center justify-center"
        >
          <HiOutlineLogin />
        </button>
      )}
    </div>
  );
}
