import React from 'react'

import { Link } from '@/src/i18n/navigation'
import SigninForm from './SigninForm'



export default function page() {
  return (

<div className="w-screen h-screen bg-[url('/image/loginCartimage.jpg')] bg-cover   ">   



<div className='bg-white w-[100%] lg:w-[50%] h-screen p-10'>
<SigninForm/>
    <p className="text-center text-gray-600 text-sm mt-6">
  {"Don't have an account?"}
  <Link href="/register" className="text-yellow-500 font-semibold hover:underline">
    Sign up
  </Link>
</p>

</div>
    </div>
      
 
  )
}
