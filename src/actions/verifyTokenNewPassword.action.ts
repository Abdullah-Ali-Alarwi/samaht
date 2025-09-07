// src/actions/verifyTokenNewPassword.action.ts
"use server";
import prisma from "@/src/lib/prismadb";

export const verifyTokenAction = async ({ token }: { token: string }) => {
  const resetToken = await prisma.resetPasswordToken.findUnique({ where: { token } });
  if (!resetToken) return { success: false, message: "الرمز غير صالح أو غير موجود" };

  const isExpired = new Date(resetToken.expires) < new Date();
  if (isExpired) return { success: false, message: "انتهت صلاحية الرمز" };

  return { success: true, message: "التوكن صالح ✅" };
};
