
import React from 'react'
import { FaEnvelope,  } from 'react-icons/fa'
import { VscCallIncoming } from "react-icons/vsc";

import { RiMapPinAddLine } from 'react-icons/ri'


export default function Page() {
  return (
    <div className='mb-20 mt-20 w-ful lg:w-[80% my-auto] '>
    

      <div className="flex  gap-10 flex-col lg:flex-row justify-around items-center mt-[200px] mb-20 w-[80%] m-auto">
        <div className="flex flex-col justify-center items-center">
          {/* Bigger SVG icon */}
          <VscCallIncoming className="text-yellow-400 w-[50px] h-[50px]" />

          <h1 className="mt-4 text-xl font-semibold">الهاتف</h1>
          <p className="text-[#787474]">0123456789</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {/* Bigger SVG icon */}
          <FaEnvelope className="text-yellow-400 w-[50px] h-[50px]" />
          
          <h1 className="mt-4 text-xl font-semibold">Email</h1>
          <p className="text-[#787474]">example@example.com</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {/* Bigger SVG icon */}
          <RiMapPinAddLine className="text-yellow-400 w-[50px] h-[50px]" />
          
          <h1 className="mt-4 text-xl font-semibold">الهاتف</h1>
          <p className="text-[#787474]">0123456789</p>
        </div>
      </div>



      <div className='w-[80%] m-auto flex flex-col lg:flex-row   justify-around '>

<div className='flex flex-col m-5 text-left w-[50%]'>
    <textarea placeholder='write your message here...' name="" minLength={10} className='min-h-[250px] w-[300px]  lg:min-w-[370px] border border-gray-300 p-2 rounded-lg' id=""></textarea>
    <button className='cursor-pointer my-5  w-[200px] bg-yellow-400 text-white py-2 px-4 rounded-lg'>Submit</button>
</div>

<div className='p-5 rounded-lg h-[300px] lg:w-[50%] m-5'>
    <h1>تواصل معنا</h1>
    <p className='text-[#787474]'>  لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعة بروشور او فلاير على سبيل المثال او نماذج مواقع انترنت..لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم.نحن هنا لمساعدتك. لا تتردد في الاتصال بنا عبر الهاتف أو البريد الإلكتروني.</p>
</div>

      </div>
    </div>
  )
}
