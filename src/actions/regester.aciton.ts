"use server";

import prisma from "@/src/lib/prismadb";
import { RegisterSchema } from "@/src/utils/validationScema";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/src/utils/generateToken";
import { sendVerificationEmail } from "@/src/utils/sendEmail";

interface RegisterValues {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
}

export async function registerAction(data: RegisterValues) {
  const parsed = RegisterSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { name, email, phone, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    if (existingUser.emailVerified) {
      return { success: true, message: "تم تسجيل الدخول بدون رمز تحقق" };
    } else {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(email, verificationToken.token);
      return {
        success: true,
        redirectVerify: true,
        message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني. يرجى التفعيل أولاً.",
      };
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, phone, password: hashedPassword, emailVerified: null },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  return {
    success: true,
    redirectVerify: true,
    message: "تم إنشاء الحساب بنجاح. تم إرسال رمز التحقق إلى بريدك الإلكتروني.",
  };
}
