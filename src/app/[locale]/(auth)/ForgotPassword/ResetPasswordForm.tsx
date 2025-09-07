"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { resetPasswordAction } from "@/src/actions/resetPasswordToken.action";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
  disable: boolean;
}

export default function ResetPasswordForm({ token, disable }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // اكتشاف اتجاه الصفحة (rtl أو ltr)
    const dir = document.documentElement.getAttribute("dir");
    setIsRTL(dir === "rtl");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }
    setLoading(true);
    try {
      const res = await resetPasswordAction({ token, password });
      if (res.success) {
        toast.success(res.message);
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          router.push("/signin");
        }, 2000);

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

  const renderInput = (
    value: string,
    setValue: (val: string) => void,
    show: boolean,
    setShow: (val: boolean) => void,
    placeholder: string
  ) => (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`border p-3 rounded-lg w-full pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
          disable ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        }`}
        disabled={disable}
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className={`absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-black`}
        style={{ [isRTL ? "left" : "right"]: "0.75rem" }}
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );

  return (
    <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
      {showConfirmPassword && <h1>يمكنك الآن تغيير كلمة المرور</h1>}

      {/* Password Field */}
      {renderInput(password, setPassword, showPassword, setShowPassword, "كلمة المرور الجديدة")}

      {/* Confirm Password Field */}
      {renderInput(
        confirmPassword,
        setConfirmPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        "تأكيد كلمة المرور"
      )}

      <button
        type="submit"
        disabled={loading || disable}
        className="bg-yellow-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
      >
        {loading ? "جاري التحقق..." : "إعادة تعيين كلمة المرور"}
      </button>
    </form>
  );
}
