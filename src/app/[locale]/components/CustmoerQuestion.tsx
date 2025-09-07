import React from 'react'

export default function question() {
  return (
    <div className=' m-0 w-full my-20  lg:m-20 lg:w-[70%] border-b-1  border-b-[#B4B4B4] p-1.5 '>
      <h2 className='bold text-[20px] mb-3  '>هل الاسعار  الموجوده في الحاسبة الشحن حقيقية ؟</h2>
      <p className='text-[#7e7e8d] text-[20px]'> نتيجة حساب التكلفة تظهر بناءً على مدخلات العميل, ولكن يتم حساب التكلفة في الشحن الجوي حسب الوزن الأعلى بين الفعلي والحجمي , وفي الشحن البحري حسب  CPM</p>  
    </div>
  )
}
