"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailForm from "./EmailForm";
import TokenForm from "./TokenForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { toast } from "react-hot-toast";
import { verifyTokenAction } from "@/src/actions/verifyTokenNewPassword.action";

export default function ForgetPasswordPage() {
  const [token, setToken] = useState("");
  const [disableTokenField, setDisableTokenField] = useState(true);
  const [disablePasswordField, setDisablePasswordField] = useState(true);

  const handleVerifyToken = async () => {
    const res = await verifyTokenAction({ token });
    if (res.success) {
      toast.success("التوكن صحيح ✅ يمكنك الآن تغيير كلمة المرور");
      setDisablePasswordField(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full mt-[200px] lg:mt-[170px] min-h-screen flex justify-center items-center bg-amber-700/5 p-4">
      <div className="bg-white w-full sm:w-[90%] max-w-md p-8 flex flex-col items-center rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">نسيت كلمة المرور</h2>
        <Image
          src="/image/forgetPass.png"
          alt="Forget Password"
          width={100}
          height={100}
          className="mb-4"
        />

        <EmailForm onSuccess={() => setDisableTokenField(false)} />
        <TokenForm
          token={token}
          setToken={setToken}
          disable={disableTokenField}
          onSubmit={handleVerifyToken}
        />
        <ResetPasswordForm token={token} disable={disablePasswordField} />

        <Link
          href="/signin"
          className="mt-4 w-full text-center text-yellow-500 border border-amber-500 px-4 py-2 rounded-lg font-semibold bg-white hover:bg-yellow-500 hover:text-white transition"
        >
          العودة إلى تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}
