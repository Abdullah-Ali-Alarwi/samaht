"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import Alert from "./Alert";
import Spinner from "../../components/Ui/spinner";
import { LoginSchema } from "@/src/utils/validationScema";
import { loginAction } from "@/src/actions/login.action";
import { signIn, getSession } from "next-auth/react";

interface ExtendedUser {
  emailVerified?: boolean | null;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const FormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await loginAction({
        email: validation.data.email,
        password: validation.data.password,
      });

      if (!res.success) {
        toast.error(res.message);

        if (res.message.includes("يرجى تفعيل حسابك")) {
          router.push("/verify");
        }
        return;
      }

      toast.success(res.message);

      // تسجيل الدخول للحصول على session
      await signIn("credentials", {
        redirect: false,
        email: validation.data.email,
        password: validation.data.password,
      });

      const session = await getSession();
      const user = session?.user as ExtendedUser;

      if (user?.emailVerified) {
        router.push("/"); // الحساب مفعل
      } else {
        router.push("/verify"); // الحساب غير مفعل
      }

    } catch (err) {
      console.error(err);
      setErrorMessage("حدث خطأ أثناء تسجيل الدخول");
      toast.error("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء تسجيل الدخول عبر Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={FormSubmitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />

        <Link href="/ForgotPassword" className="text-sm text-yellow-500 hover:underline">
          Forgot your password?
        </Link>

        {errorMessage && <Alert message={errorMessage} />}

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? <Spinner /> : "Sign in with Email"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="text-gray-900 border-1 border-yellow-500 px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:border-amber-200 transition disabled:opacity-50 flex justify-center items-center mt-2"
        >
          {loading ? <Spinner /> : <>Sign in with Google <FcGoogle className="text-xl mx-3" /></>}
        </button>
      </form>
    </div>
  );
}
