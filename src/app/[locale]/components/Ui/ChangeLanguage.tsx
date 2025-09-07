"use client"; // مهم: هذا مكون للـ Client

import React from "react";
import { RiGlobalLine } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";

export default function ChangeLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // إعادة التوجيه مع تغيير اللغة
    // نفترض أن اللغة هي جزء من المسار: /[locale]/...
    const segments = pathname.split("/");
    segments[1] = newLocale; // استبدل الجزء الأول بعد "/" بالـ locale الجديد
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor="language"
        className="mx-2 text-3xl text-white bg-amber-400 rounded-full p-1"
      >
        <RiGlobalLine />
      </label>
      <select
        id="language"
        className="border-2 text-sm border-gray-300 rounded-full p-1"
        onChange={handleChange}
        defaultValue={pathname.split("/")[1]} // القيمة الحالية للغة
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}
