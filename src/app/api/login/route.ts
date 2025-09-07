import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return new Response(
        JSON.stringify({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }),
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }),
        { status: 400 }
      );
    }

    // يمكنك هنا إزالة الحقل password قبل إرجاع المستخدم
    const { password: _pass, ...userWithoutPassword } = user;

    return new Response(
      JSON.stringify({ message: "تم تسجيل الدخول بنجاح", user: userWithoutPassword }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "حدث خطأ أثناء تسجيل الدخول" }),
      { status: 500 }
    );
  }
}
