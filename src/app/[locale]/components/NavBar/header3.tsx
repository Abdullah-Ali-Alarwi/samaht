
import React from 'react'
import AllCategoryList from '../Ui/AllCategoryList'

import LinkList from './LinkList'


export default function header3() {
  return (
    <div className=' w-[95%] lg:w-full flex items-center justify-center  m-auto  border-b-1 border-gray-300 mt-7'>

      <div className='w-[95%]  m-auto flex  items-center justify-between '>
       
      <LinkList/>
      <AllCategoryList  />
      </div>
    </div>
  )
}
