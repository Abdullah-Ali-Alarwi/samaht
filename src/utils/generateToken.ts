import prisma from "@/src/lib/prismadb";

// دالة لتوليد كود رقمي من 6 أرقام
function generateNumericToken(length = 6) {
  let token = "";
  for (let i = 0; i < length; i++) {
    token += Math.floor(Math.random() * 10); // رقم من 0-9
  }
  return token;
}

/**
 * إنشاء رمز تحقق جديد للبريد الإلكتروني
 */
export async function generateVerificationToken(email: string) {
  // حذف رمز سابق إن وجد
  const existingToken = await prisma.verificationToken.findFirst({ where: { email } });
  if (existingToken) {
    await prisma.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const token = generateNumericToken(6); 
  const expires = new Date(new Date().getTime() + 3600 * 1000); // ساعة واحدة

  const verificationToken = await prisma.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
}

/**
 * إنشاء رمز إعادة كلمة المرور (Forget Password Token)
 */
export async function generateForgetPasswordToken(email: string) {
  // حذف رمز سابق إن وجد
  const existingToken = await prisma.resetPasswordToken.findFirst({ where: { email } });
  if (existingToken) {
    await prisma.resetPasswordToken.delete({ where: { id: existingToken.id } }); 
  }

  const token = generateNumericToken(6); 
  const expires = new Date(new Date().getTime() + 3600 * 1000); // ساعة واحدة

  const resetPasswordToken = await prisma.resetPasswordToken.create({
    data: { email, token, expires },
  });

  return resetPasswordToken;
}
