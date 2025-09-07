"use server";

import prisma from "@/src/lib/prismadb";
import { generateVerificationToken } from "@/src/utils/generateToken";
import { sendVerificationEmail } from "@/src/utils/sendEmail";

export const verifyingEmailAction = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return { success: false, message: "الرمز غير موجود" };
    }

    const isExpired = new Date(verificationToken.expires) < new Date();
    if (isExpired) {
      // إعادة إرسال الرمز إذا انتهت صلاحيته
      const newToken = await generateVerificationToken(verificationToken.email);
      await sendVerificationEmail(verificationToken.email, newToken.token);

      return {
        success: false,
        message:
          "انتهت صلاحية الرمز، تم إرسال رمز جديد إلى بريدك الإلكتروني",
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });

    if (!user) {
      return { success: false, message: "المستخدم غير موجود" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { success: true, message: "تم تفعيل بريدك الإلكتروني بنجاح ✅" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء التحقق" };
  }
};

// دالة مساعدة لإعادة إرسال الرمز عند الحاجة
export const resendVerificationAction = async (email: string) => {
  try {
    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token.token);
    return { success: true, message: "تم إرسال رمز التحقق مرة أخرى ✅" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "فشل في إرسال الرمز" };
  }
};



