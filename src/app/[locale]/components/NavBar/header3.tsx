
import React from 'react'
import ButtonCalculator from '../Ui/ButtonCalculator'
import AllCategoryList from '../Ui/AllCategoryList'

import LinkList from './LinkList'


export default function header3() {
  return (
    <div className=' w-[95%] lg:w-full  m-auto  border-b-1 border-gray-300 py-3'>

      <div className='w-[95%] m-auto flex  items-center justify-between '>
        <ButtonCalculator  />
      <LinkList/>
      <AllCategoryList  />
      </div>
    </div>
  )
}
