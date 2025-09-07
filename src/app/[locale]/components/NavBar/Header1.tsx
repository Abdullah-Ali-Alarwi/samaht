import React from 'react'
import { FaPhoneAlt, FaWhatsappSquare } from "react-icons/fa";
import { HiEnvelope } from 'react-icons/hi2';
import { ImFacebook2 } from 'react-icons/im';
import { IoLogoYoutube } from 'react-icons/io';

export default function Header1() {
  return (
    <div className=" hidden   bg-gray-600 lg:flex  text-[22px] items-center justify-around h-[20px] text-white p-4 w-[100%] ">

  <div className='flex  w-1/7 justify-around  '>
    <IoLogoYoutube />
    <ImFacebook2 />
    <FaWhatsappSquare />


  </div>

  <div className='flex   justify-between gap-7 '>
    

<div className='flex  justify-center items-center gap-5'>
 <HiEnvelope />
        <p className='text-sm'>smahaat@gmail.com</p>
      </div>
<div className='flex  justify-center items-center gap-5'>
 <FaPhoneAlt />
        <p className='text-sm'>778826655</p>
      </div>

  </div>
</div>

  )
}
