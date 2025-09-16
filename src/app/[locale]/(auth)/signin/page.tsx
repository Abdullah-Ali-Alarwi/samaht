import React from 'react';
import { Link } from '@/src/i18n/navigation';
import SigninForm from './SigninForm';

export default function page() {
  return (
    <div className="w-full mt-[100px] lg:mt-[40px] h-screen flex justify-center items-center bg-amber-700/5 p-4">
      <div className='bg-white mt-[100px] w-full sm:w-[90%] lg:w-[50%] mx-auto py-20 px-6 rounded-md shadow-md'>
        <SigninForm />
        <p className="text-center text-gray-600 text-sm mt-6">
          {"Don't have an account? "}
          <Link href="/register" className="text-yellow-500 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
