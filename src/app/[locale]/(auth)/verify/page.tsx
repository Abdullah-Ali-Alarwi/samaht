"use client";

import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { verifyingEmailAction, resendVerificationAction } from "@/src/actions/verify.action"; 
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import verfication from "@/public/image/verfication.png";

export default function VerifyPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; // البريد من URL

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").trim().slice(0, otp.length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = Array(6).fill("");
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
        if (inputRefs.current[i]) inputRefs.current[i]!.value = pastedData[i];
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, otp.length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    setLoading(true);
    try {
      const res = await verifyingEmailAction(code);
      if (res.success) {
        toast.success(res.message);
        router.push("/signin"); // إعادة التوجيه بعد التحقق
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("حدث خطأ أثناء التحقق من الرمز");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error("البريد غير موجود");
    setLoading(true);
    try {
      const res = await resendVerificationAction(email); 
      if (res.success) {
        toast.success("تم إرسال الرمز مجدداً إلى بريدك الإلكتروني");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("فشل في إعادة إرسال الرمز");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5 bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-md flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">التحقق من البريد الإلكتروني</h2>
        <Image
          src={verfication}
          width={200}
          height={200}
          className="m-10"
          alt="صورة توضيحية للتحقق"
        />
        <p className="m-5 text-center">
          من فضلك قم بإدخال رمز التحقق الذي تم ارساله الى بريدك الالكتروني 
          <span className="text-yellow-500"> {email}</span>
        </p>

        <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center border rounded-lg text-xl font-bold"
            />
          ))}
        </form>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 w-full bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? "جاري التحقق..." : "تحقق من الرمز"}
        </button>

        <p className="mt-4 text-center">إذا لم يصلك رمز التحقق يمكنك الإرسال مرة أخرى:</p>
        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-2 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition disabled:opacity-50"
        >
          {loading ? "جاري الإرسال..." : "إعادة إرسال الرمز"}
        </button>
      </div>
    </div>
  );
}
