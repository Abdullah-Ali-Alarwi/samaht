"use client";

import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-screen h-screen  mt-[100px] flex justify-center items-center bg-amber-700/5 p-4">
      <div className="bg-white w-full p-10  lg:w-[70%] mx-auto lg:px-40   rounded-md shadow-lg">
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
