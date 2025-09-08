"use client";

import React, { useState, useRef } from "react";

interface Props {
  token: string;
  setToken: (val: string) => void;
  disable: boolean;
  onSubmit?: () => void; // دالة يتم استدعاؤها عند الضغط على زر الإرسال
}

export default function TokenForm({ token, setToken, disable, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setToken(newOtp.join(""));
      if (value && index < otpLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        setToken(newOtp.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").trim().slice(0, otpLength);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = Array(otpLength).fill("");
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
        if (inputRefs.current[i]) inputRefs.current[i]!.value = pastedData[i];
      }
      setOtp(newOtp);
      setToken(newOtp.join(""));
      const nextIndex = Math.min(pastedData.length, otpLength - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-6 border-b-2 border-yellow-300 p-3">
      <p>لكي تتمكن من تغيير كلمة السر يجب إدخال رمز التحقق عبر البريد</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between flex-wrap gap-1">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
                ref={(el) => { inputRefs.current[index] = el; }}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={disable}
              className={`w-7 h-7 lg:w-12 lg:h-12 text-center border rounded-lg text-xl font-bold focus:ring-2 focus:ring-yellow-400 ${
                disable ? "bg-gray-200 cursor-not-allowed" : "bg-white"
              }`}
              required
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={loading || disable}
          className="bg-yellow-400 text-white px-4 py-3 w-full rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? "جاري الإرسال..." : "تحقق"}
        </button>
      </form>
    </div>
  );
}
