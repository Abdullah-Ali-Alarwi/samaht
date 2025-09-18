
import React from 'react'
import AllCategoryList from '../Ui/AllCategoryList'

import NavbarDesktop from './NavbarDesktop'


export default function header3() {
  return (
    <div className=' w-full  lg:w-full flex items-center justify-center pb-1 bg-[#FEFDE7] lg:bg-white m-auto  border-b-1 border-gray-300 '>

      <div className='w-[95%]  m-auto flex  items-center justify-between '>
       
      <NavbarDesktop/>
      <AllCategoryList  />
      </div>
    </div>
  )
}
