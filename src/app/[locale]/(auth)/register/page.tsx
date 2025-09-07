"use client";

import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {




  return (
    <div className="w-screen h-screen bg-[url('/image/loginCartimage.jpg')] bg-cover bg-center flex items-center justify-start">
      <div className="bg-white lg:px-40 p-10 h-full shadow-lg w-screen lg:w-[50%]">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

     
        <RegisterForm />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social buttons */}
 

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-yellow-500 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
