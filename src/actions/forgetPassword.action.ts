// src/actions/forgetPassword.action.ts
"use server";

import prisma from "@/src/lib/prismadb";
import { z } from "zod";
import { ForgetPasswordSchema } from "@/src/utils/validationScema";
import { sendRestPasswordToken } from "@/src/utils/sendEmail";

// دالة لتوليد توكن مؤقت
const generateToken = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 أرقام
};

export const forgotPasswordAction = async (props: z.infer<typeof ForgetPasswordSchema>) => {
  try {
    // التحقق من صحة البريد
    const validation = ForgetPasswordSchema.safeParse(props);
    if (!validation.success) {
      return { success: false, message: validation.error.issues[0].message };
    }

    const { email } = validation.data;

    // التحقق من وجود المستخدم
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: false, message: "البريد الإلكتروني غير موجود" };

    // إنشاء رمز استعادة كلمة المرور
    const token = generateToken();

    // حفظ التوكن في قاعدة البيانات مع صلاحية ساعة
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await prisma.resetPasswordToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    // إرسال الرمز عبر الإيميل
    await sendRestPasswordToken(email, token);

    return { success: true, message: "تم إرسال رمز استعادة كلمة المرور إلى بريدك الإلكتروني" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء العملية" };
  }
};
