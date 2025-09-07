
import React from 'react'
import Image from 'next/image'

import CatigorySlider from './Hero/CatigorySlider'
import hero from "@/public/image/hero.png"

export default function MainHero() {
  return (
    <div>
      <Image src={hero} alt="hero"  className='w-full h-auto'/>
      <CatigorySlider />
    </div>
  )
}
