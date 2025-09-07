"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordAction } from "@/src/actions/resetPasswordToken.action";
import { useSearchParams } from "next/navigation";

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      toast.error("رابط إعادة تعيين كلمة المرور غير صالح");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !email) {
      toast.error("الرابط غير صالح");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    setLoading(true);
    try {
      // إرسال البيانات مع توافق النوع مع الدالة
      const res: ResetPasswordResponse = await resetPasswordAction({
        token,
        password,
      
      });

      if (res.success) {
        toast.success(res.message);
        setPassword("");
        setConfirmPassword("");
        window.location.href = "/signin";
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء إعادة تعيين كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="كلمة المرور الجديدة"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="تأكيد كلمة المرور"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {showConfirmPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 flex justify-center items-center"
      >
        {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
      </button>
    </form>
  );
}
