
import React from 'react'
import AllCategoryList from '../Ui/AllCategoryList'

import LinkList from './LinkList'


export default function header3() {
  return (
    <div className=' w-full  lg:w-full flex items-center justify-center bg-[#FEFDE7] lg:bg-white m-auto  border-b-1 border-gray-300 '>

      <div className='w-[95%]  m-auto flex  items-center justify-between '>
       
      <LinkList/>
      <AllCategoryList  />
      </div>
    </div>
  )
}
