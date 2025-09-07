"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { forgotPasswordAction } from "@/src/actions/forgetPassword.action";

interface Props {
  onSuccess: () => void; // لتفعيل حقل التوكن بعد النجاح
}

export default function EmailForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPasswordAction({ email });
      if (res.success) {
        toast.success(res.message);
        onSuccess(); // تفعيل التوكن
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء إرسال الرابط");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="أدخل بريدك الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
      >
        {loading ? "جاري الإرسال..." : "إرسال التوكن"}
      </button>
    </form>
  );
}
