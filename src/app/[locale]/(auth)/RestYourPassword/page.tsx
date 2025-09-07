import React from 'react'


import Image from 'next/image'
import Link from 'next/link'
import ResetPasswordForm from './ResetPasswordForm'


export default function page() {
  return (

<div className="w-screen h-screen bg-[url('/image/loginCartimage.jpg')] bg-cover   ">   



<div className='bg-white w-[50%] min-h-screen  p-10 flex flex-col items-center justify-center'>



    <Image src="/image/verfication.png" alt="Forget Password" width={100} height={100}  />


<ResetPasswordForm/>
<button  className="mt-4 w-[50%]  hover:text-white text-yellow-500 border-1 border-amber-500 px-4 py-2 rounded-lg font-semibold bg-white hover:bg-yellow-500 transition" >
  <Link href="/signin" >
  العودة إلى تسجيل الدخول
</Link>
</button>


    <p className="mt-4 text-gray-600">
      ليس لديك حساب  ؟ <Link href="/register" className="text-yellow-500 hover:underline">إنشاء حساب جديد</Link>
    </p>
  
  </div>
</div>

  )
}
