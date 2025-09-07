import { z } from  "zod";
export const LoginSchema = z.object({

  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long")
});



export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
  
  phone: z
    .string()
    .min(9, "Phone number must be at least 9 characters")
    .max(15, "Phone number must be at most 15 characters")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"), // 🔹 تحقق من أن كل الحروف أرقام

  email: z.string().email("Invalid email address"),
  
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
  
  confirmPassword: z
    .string()
    .min(6, "Passwords dose not match")
    .max(100, "Passwords dose not match"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords dose not match",
  path: ["confirmPassword"],
});


export const ForgetPasswordSchema = z.object({
  email: z.string().email({message:"Invalid Email"})
})
