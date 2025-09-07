"use server";

import prisma from "@/src/lib/prismadb";
import bcrypt from "bcryptjs";

import { generateVerificationToken } from "@/src/utils/generateToken";
import { sendVerificationEmail } from "@/src/utils/sendEmail";

interface LoginValues {
  email: string;
  password: string;
}

export async function loginAction({ email, password }: LoginValues) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { success: false, message: "المستخدم غير موجود" };

  const isPasswordValid = await bcrypt.compare(password, user.password || "");
  if (!isPasswordValid) return { success: false, message: "كلمة المرور غير صحيحة" };

  // إذا لم يكن مفعل
  if (!user.emailVerified) {
    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token.token);
    return { success: false, redirectVerify: true, message: "يرجى تفعيل حسابك باستخدام الرمز المرسل إلى بريدك الإلكتروني." };
  }

  return { success: true, message: "تم تسجيل الدخول بنجاح" };
}
