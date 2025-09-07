import React from 'react'
import CustmoerQuestion from "@/src/app/[locale]/components/CustmoerQuestion"


export default function page() {
  return (
    <div className='mb-20 m-10 '>
<div className='flex justify-center '>
   <div className=" w-full lg:w-[70%] h-[308px] bg-[url('/image/CustmerQuestion.jpg')]  bg-[center_75%] text-center border-1 rounded-md border-yellow-100   relative bg-cover  ">
  <div className='bg-yellow-800/30 h-full w-full bg-opacity-20 flex justify-center items-center rounded-md'>
    <h1 className='absolute left-0 text-[36px] ml-20'>الأسئلة الشائعة</h1>
  </div>
</div>
</div>

      <div>
        <h1 className='m-10 text-2xl text-yellow-500'>الأسئلة الشائعة</h1>
      </div>
      <CustmoerQuestion />
      <CustmoerQuestion />
      <CustmoerQuestion />
      <CustmoerQuestion />
      <CustmoerQuestion />
      <CustmoerQuestion />

    </div>
  )
}
