// src/actions/resetPasswordToken.action.ts
"use server";
import prisma from "@/src/lib/prismadb";
import bcrypt from "bcryptjs";

export const resetPasswordAction = async ({ token, password }: { token: string; password: string }) => {
  const resetToken = await prisma.resetPasswordToken.findUnique({ where: { token } });
  if (!resetToken) return { success: false, message: "الرمز غير صالح أو غير موجود" };

  const isExpired = new Date(resetToken.expires) < new Date();
  if (isExpired) return { success: false, message: "انتهت صلاحية الرمز" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: resetToken.email },
    data: { password: hashedPassword },
  });

  await prisma.resetPasswordToken.delete({ where: { id: resetToken.id } });

  return { success: true, message: "تم إعادة تعيين كلمة المرور بنجاح ✅" };
};
